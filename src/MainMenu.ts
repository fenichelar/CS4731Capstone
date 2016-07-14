/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

namespace Game {
  export class MainMenu extends Phaser.State {

    create() {
      makeTitle(this.game);

      const menuText: string = "Main Menu";
      const menuX: number = this.game.world.centerX;
      const menuY: number = this.game.world.centerY + this.game.height * 0.25;
      let menu: any = this.game.add.text(menuX, menuY, menuText, {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#ff0",
        font: "80px Titillium Web"
      });
      menu.anchor.setTo(0.5, 0.5);

    }

  }
}
