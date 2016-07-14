/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

namespace Game {
  export class Preloader extends Phaser.State {

    preloadBar: Phaser.Sprite;

    preload() {
      makeTitle(this.game);

      this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "preloadBar");
      this.preloadBar.anchor.setTo(0.5, 0.5);
      this.load.setPreloadSprite(this.preloadBar);
      this.preloadBar.scale.setTo(4, 4);
      // Load assets here
    }

    create() {
      const pressKeyText: string = "Click anywhere to start...";
      const pressKeyX: number = this.game.world.centerX;
      const pressKeyY: number = this.game.world.centerY + this.game.height * 0.25;
      let pressKey: any = this.game.add.text(pressKeyX, pressKeyY, pressKeyText, {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#ff0",
        font: "80px Titillium Web"
      });
      this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "preloadBar");
      this.preloadBar.anchor.setTo(0.5, 0.5);
      this.preloadBar.scale.setTo(4, 4);
      pressKey.anchor.setTo(0.5, 0.5);

      this.input.onDown.addOnce(this.startMainMenu, this);
    }

    startMainMenu() {
      this.game.state.start("MainMenu");
    }

  }
}
