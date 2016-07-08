/*
Copyright 2016 Alec Fenichel, Matt Schmidt, and Benjamin Elder

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
module Game {
  export class MainMenu extends Phaser.State {

    create() {
      const titleText: string = "Game Title";
      const titleX: number = this.game.world.centerX;
      const titleY: number = this.game.world.centerY - this.game.height * 0.25;
      let title: any = this.game.add.text(titleX, titleY, titleText, {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#fff",
        font: "50px Titillium Web"
      });
      title.anchor.setTo(0.5, 0.5);

      const menuText: string = "Main Menu";
      const menuX: number = this.game.world.centerX;
      const menuY: number = this.game.world.centerY + this.game.height * 0.25;
      let menu: any = this.game.add.text(menuX, menuY, menuText, {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#ff0",
        font: "20px Titillium Web"
      });
      menu.anchor.setTo(0.5, 0.5);

    }

  }
}
