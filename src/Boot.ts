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
