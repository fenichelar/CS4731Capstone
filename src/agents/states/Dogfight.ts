/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  // In this state, agents attempt to path to an enemy while avoiding combat
  export class Dogfight extends State {
    public static DOGFIGHT_RANGE: number = 150;
    public update(agent: Ship): State {
      // select a new target when necessary
      if (!agent.target || agent.target.health <= 0) {
        agent.target = null;
        if (Battle.CurrentBattle) {
          agent.target = agent.selectTargetFrom(Battle.CurrentBattle.allShips);
        }
      }
      // don't do anything else if there are no targets
      if (!agent.target || !agent.target.sprite || !agent.target.body) {
        return new Idle();
      }
      // otherwise we want to try to stay behind towards the target.
      /*
      let offset: number = agent.target.width * .5;
      let targetAngle: number = 0; // agent.target.body.rotation;
      let targetX: number = agent.target.body.x + Math.cos(targetAngle) * offset;
      let targetY: number = agent.target.body.y + Math.sin(targetAngle) * offset;
      agent.turnTowards(targetX, targetY);
      */
      agent.turnTowardsShip(agent.target);
      agent.thrust(agent.maxThrustSpeed * .4);
      agent.fire();
      let targetDistance = shipDist(agent, agent.target);
      // continue doghfigting until we are out of range.
      if (targetDistance > Dogfight.DOGFIGHT_RANGE) {
        return new Strafe();
      } else {
        return this;
      }
    }
  }
}
