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
                if (Battle.CurrentBattle != null) {
                  let enemies: Array<Game.Ship> = Battle.CurrentBattle.enemies;
                  // TODO: sort and select by distance
                }
            }
            if (this.target != null) {
              ship.turnTowards(this.target);
              ship.thrust(ship.maxThrustSpeed);
              ship.fire();
            }
            return this;
        }
    }
}
