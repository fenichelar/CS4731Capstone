/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts" />

namespace Game {
  export class Battleship extends Ship {
    public static BATTLESHIP_BASE_HEALTH: number = 1000;

    public constructor(public team: number) {
      super(Battleship.BATTLESHIP_BASE_HEALTH, team);
    }
  }
}
