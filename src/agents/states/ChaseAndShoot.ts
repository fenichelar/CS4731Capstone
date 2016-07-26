/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class ChaseAndShoot extends State {
    public update(agent: Ship): State {
      if (!agent.target || agent.target.health <= 0) {
        agent.target = null;
        if (Battle.CurrentBattle) {
          // Find the closest enemy ship to us
          let closestEnemy: Ship = null;
          for (let otherShip of Battle.CurrentBattle.allShips) {
            if (agent.team !== otherShip.team && shipDist(agent, otherShip) < shipDist(agent, closestEnemy)) {
              closestEnemy = otherShip;
            }
          }
          agent.target = closestEnemy;
        }
      }

      if (agent.target != null) {
        agent.turnTowards(agent.target);
        agent.thrust(agent.maxThrustSpeed);
        agent.fire();
      }
      return this;
    }
  }
}
