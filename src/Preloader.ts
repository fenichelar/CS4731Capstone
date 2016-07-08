module Game {
  export class Preloader extends Phaser.State {

    preloadBar: Phaser.Sprite;

    preload() {
      this.preloadBar = this.add.sprite(200, 250, "preloadBar");
      this.load.setPreloadSprite(this.preloadBar);
    }

    create() {
      let tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
      tween.onComplete.add(this.startTitleScreen, this);
    }

    startTitleScreen() {
      this.game.state.start("TitleScreen", true, false);
    }

  }
}
