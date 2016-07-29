/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  // In this state, agents attempt to path to an enemy while avoiding combat
  export class Dogfight extends State {
    public static DOGFIGHT_RANGE: number = 100;

    public static inDogfightRange(agent: Ship, target: Ship): boolean {
      return shipDistMinusRadius(agent, target) <= Dogfight.DOGFIGHT_RANGE;
    }
    public update(agent: Ship): State {
      // if the target is not in fighting range, look for a target that is
      if (shipDist(agent, agent.target) > Dogfight.DOGFIGHT_RANGE) {
        let alternateTarget: Ship = agent.selectTargetFrom(Battle.CurrentBattle.allShips);
        if (Dogfight.inDogfightRange(agent, alternateTarget)) {
          agent.target = alternateTarget;
        }
      }
      // and switch to idle when necessary
      if (!agent.target || agent.target.health <= 0) {
        return new Idle();
      }
      // otherwise we want to try to stay behind towards the target.
      let offset: number = Math.max(agent.target.sprite.width, agent.target.sprite.height) * 4.0;
      let thrustAmount: number = agent.maxThrustSpeed * .75;
      let currentAngle: number = agent.body.rotation;
      let targetAngle: number = agent.target.body.rotation;
      // if we're roughly behind the target, we just want to point and shoot,
      // otherwise we want to move around it.
      if (Math.abs(fixAngle(currentAngle - targetAngle)) < Math.PI / 3) {
        offset = 0;
      } else {
        targetAngle += Math.PI / 2;
      }
      // when too close, thrust back
      if (shipDistMinusRadius(agent, agent.target) < Dogfight.DOGFIGHT_RANGE * .5) {
        thrustAmount = - thrustAmount;
      }
      let targetX: number = agent.target.body.x + Math.cos(targetAngle) * offset;
      let targetY: number = agent.target.body.y + Math.sin(targetAngle) * offset;
      // if our circling location isn't within the map, just point and shoot,
      // and switch to dogfighting
      if (outsideMap(agent.sprite.game, targetX, targetY)) {
        agent.turnTowardsShip(agent.target);
      } else {
        agent.turnTowards(targetX, targetY);
      }
      agent.thrust(thrustAmount);
      agent.fire();
      // continue doghfigting until we are out of range.
      if (!Dogfight.inDogfightRange(agent, agent.target)) {
        return new Strafe();
      } else {
        return this;
      }
    }
  }
}
