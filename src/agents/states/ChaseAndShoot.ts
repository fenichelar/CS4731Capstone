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
            if (target == null || target.health <= 0) {
                // select a new target
                // TODO
            }
            ship.turnTowards(target);
            ship.thrust(ship.maxThrustSpeed);
            ship.fire();
            return this;
        }
    }
}
