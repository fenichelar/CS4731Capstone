/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Cruiser extends Ship {
    public static CRUISER_BASE_HEALTH: number = 250;

    public constructor(public team: number) {
      super(Cruiser.CRUISER_BASE_HEALTH, team);
    }
  }
}
