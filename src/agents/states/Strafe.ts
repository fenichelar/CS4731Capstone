/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  // In this state, agents attempt to path to an enemy while avoiding combat
  export class Strafe extends State {
    public update(agent: Ship): State {
      let nextState: State = this;
      // select a new target when necessary
      if (!agent.target || agent.target.health <= 0) {
        return new Idle();
      }
      // if the target is not in fighting range, look for a target that is
      if (shipDist(agent, agent.target) > Dogfight.DOGFIGHT_RANGE) {
        let alternateTarget: Ship = agent.selectTargetFrom(Battle.CurrentBattle.allShips);
        if (Dogfight.inDogfightRange(agent, alternateTarget)) {
          agent.target = alternateTarget;
        }
        nextState = new Dogfight();
      }
      // otherwise we want to strafe towards the target.
      let dx: number = agent.target.sprite.x - agent.sprite.x;
      let dy: number = agent.target.sprite.y - agent.sprite.y;
      // note: phaser's angles range from -180 to 180 (in degrees)
      // 0 is upwards, therefore we need to map our angles into this range
      let targetDistance = shipDist(agent, agent.target);
      let offset: number = targetDistance * .66 + Dogfight.DOGFIGHT_RANGE / 4;
      let targetAngle: number = Math.atan2(dy, dx) - Math.PI / 2;
      let targetX: number = agent.target.sprite.x + Math.cos(targetAngle) * offset;
      let targetY: number = agent.target.sprite.y + Math.sin(targetAngle) * offset;
      // if our strafing location isn't within the map, just point and shoot,
      // and switch to dogfighting
      if (outsideMap(agent.sprite.game, targetX, targetY)) {
        agent.turnTowardsShip(agent.target);
        nextState = new Dogfight();
      } else {
        agent.turnTowards(targetX, targetY);
      }
      agent.thrust(agent.maxThrustSpeed);
      agent.fire();
      // continue strafing until we are within range.
      if (Dogfight.inDogfightRange(agent, agent.target)) {
        nextState = new Dogfight();
      }
      return nextState;
    }
  }
}
