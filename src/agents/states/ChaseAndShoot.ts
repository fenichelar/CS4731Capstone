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
        // select a new target
        // TODO
        agent.target = null;
        if (Battle.CurrentBattle != null) {
          let enemies: Array<Game.Ship> = Battle.CurrentBattle.enemies;
          let isAlly: boolean = agent.team === Battle.CurrentBattle.allies[0].team;
          if (!isAlly) {
            enemies = Battle.CurrentBattle.allies;
          }
          let enemiesSorted: Array<Game.Ship> = enemies.sort((e1, e2) => shipDist(e1, agent) - shipDist(e2, agent));
          for (let enemy of enemiesSorted) {
            if (enemy != null && enemy.health > 0) {
              agent.target = enemy;
              break;
            }
          }
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
