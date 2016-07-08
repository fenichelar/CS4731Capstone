module Game {
  //TODO: Make this menu useful...
  export class MainMenu extends Phaser.State {
    create() {
      var title: string = "<Insert Menu Here>";
      var textStyle: any = { font: '50px Titillium Web', fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
      var text: any = this.game.add.text(0, 0, title, textStyle);
      text.x = Math.round((this.game.width - text.width) * 0.5);
      text.y = Math.round((this.game.height * 0.5 - text.height) * 0.5);
    }
  }
}