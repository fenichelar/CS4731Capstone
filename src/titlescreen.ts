module Game {
  export class TitleScreen extends Phaser.State {
    create() {
      // Insert Better Name Here:
      var title: string = "Inordinate Space Conflicts";
      var textStyle: any = { font: '50px Titillium Web', fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
      var text: any = this.game.add.text(0, 0, title, textStyle);
      text.x = Math.round((this.game.width - text.width) * 0.5);
      text.y = Math.round((this.game.height * 0.5 - text.height) * 0.5);
      // display prompt string:
      var title: string = "Press any key to start.";
      textStyle = { font: '20px Titillium Web', fill: "#ff0", boundsAlignH: "center", boundsAlignV: "middle" };
      text = this.game.add.text(0, 0, title, textStyle);
      text.x = Math.round((this.game.width - text.width) * 0.5);
      text.y = Math.round((this.game.height * 0.75 - text.height) * 0.5);

      this.input.onDown.addOnce(this.switchToMenu, this);
    }

    switchToMenu() {
      this.game.state.start('MainMenu');
    }
  }
}