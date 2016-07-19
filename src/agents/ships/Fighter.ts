/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts" />

namespace Game {
  export class Fighter extends Ship {
    public static FIGHTER_BASE_HEALTH: number = 50;

    public constructor(public team: number) {
      super(Fighter.FIGHTER_BASE_HEALTH, team);
    }
  }
}
