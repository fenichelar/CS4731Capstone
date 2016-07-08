/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

module Game {
  export class Boot extends Phaser.State {

    preload() {
      this.load.image("preloadBar", "assets/loader.png");
    }

    create() {
      this.input.maxPointers = 1;
      this.stage.disableVisibilityChange = true;

      if (this.game.device.desktop) {
        // Desktop settings
      } else {
        // Mobile settings
      }

      this.game.state.start("Preloader", true, false);

    }

  }
}
