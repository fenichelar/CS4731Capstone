/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class ChaseAndShoot extends State {
    private target: Ship = null;
    public update(ship: Ship): State {
      if (this.target == null || this.target.health <= 0) {
        // select a new target
        // TODO
        this.target = null;
        if (Battle.CurrentBattle != null) {
          let enemies: Array<Game.Ship> = Battle.CurrentBattle.enemies;
          let is_ally: boolean = ship.team == Battle.CurrentBattle.enemies[0].team;
          if (!is_ally) {
            enemies = Battle.CurrentBattle.allies;
          }
          let enemies_sorted: Array<Game.Ship> = enemies.sort((e1, e2) => shipDist(e1, ship) - shipDist(e2, ship));
          for (let enemy of enemies_sorted) {
            if (enemy != null && enemy.health > 0) {
              this.target = enemy;
              break;
            }
          }
        }
      }
      console.log(this.target);
      if (this.target != null) {
        ship.turnTowards(this.target);
        ship.thrust(ship.maxThrustSpeed);
        ship.fire();
      }
      return this;
    }
  }
}
