module Game {
  export class MainMenu extends Phaser.State {

    create() {
      const menuText: string = "Game Title";
      let menu: any = this.game.add.text(0, 0, menuText, {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#fff",
        font: "50px Titillium Web"
      });
      menu.x = Math.round((this.game.width - menu.width) * 0.5);
      menu.y = Math.round((this.game.height * 0.5 - menu.height) * 0.5);

      this.input.onDown.addOnce(this.startGame, this);
    }

    startGame() {
      console.log("Starting the game");
    }

  }
}
