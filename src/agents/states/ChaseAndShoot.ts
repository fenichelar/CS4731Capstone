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
      if (!ship.isAlive || ship.sprite == null || ship.sprite.body == null) {
        return;
      }
      //if (this.target == null || this.target.isAlive) {
      // select a new target
      // TODO
      this.target = null;
      if (Battle.CurrentBattle != null) {
        let enemies: Array<Game.Ship> = Battle.CurrentBattle.enemies;
        let isAlly: boolean = ship.team === Battle.CurrentBattle.allies[0].team;
        if (!isAlly) {
          enemies = Battle.CurrentBattle.allies;
        }
        let enemiesSorted: Array<Game.Ship> = enemies.sort((e1, e2) => shipDist(e1, ship) - shipDist(e2, ship));
        for (let enemy of enemiesSorted) {
          if (enemy != null && enemy.isAlive) {
            this.target = enemy;
            break;
          }
        }
      }
      //}
      if (this.target != null) {
        ship.turnTowards(this.target);
        ship.thrust(ship.maxThrustSpeed);
        ship.fire();
      }
      return this;
    }
  }
}
