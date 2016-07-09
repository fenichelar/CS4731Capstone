/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

module Game {
  export class Game extends Phaser.Game {

    constructor() {
      super(800, 600, Phaser.AUTO, "game-container", null);

      this.state.add("Boot", Boot, false);
      this.state.add("Preloader", Preloader, false);
      this.state.add("MainMenu", MainMenu, false);

      this.state.start("Boot");

    }

  }
}
