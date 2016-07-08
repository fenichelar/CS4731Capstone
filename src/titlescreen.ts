module Game {
  export class TitleScreen extends Phaser.State {
    create() {
      const titleText: string = "Game Title";
      let title: any = this.game.add.text(0, 0, titleText, {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#fff",
        font: "50px Titillium Web"
      });
      title.x = Math.round((this.game.width - title.width) * 0.5);
      title.y = Math.round((this.game.height * 0.5 - title.height) * 0.5);

      const pressKeyText: string = "Press any key to start...";
      let pressKey: any = this.game.add.text(0, 0, pressKeyText, {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#ff0",
        font: "20px Titillium Web"
      });
      pressKey.x = Math.round((this.game.width - pressKey.width) * 0.5);
      pressKey.y = Math.round((this.game.height * 0.75 - pressKey.height) * 0.5);

      this.input.onDown.addOnce(this.startMainMenu, this);
    }

    startMainMenu() {
      this.game.state.start("MainMenu");
    }
  }
}
