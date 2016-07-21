/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export const name: string = "Game Title";
  export function makeTitle(game: Game.Game): Phaser.Text {
    const titleX: number = game.world.centerX;
    const titleY: number = game.world.centerY - game.height * 0.25;
    let title: any = game.add.text(titleX, titleY, name, {
      boundsAlignH: "center",
      boundsAlignV: "middle",
      fill: "#fff",
      font: "140px Titillium Web"
    });
    title.anchor.setTo(0.5, 0.5);
    return title;
  }

  export function teamToSprite(game: Game.Game, x: number, y: number, spritePrefix: string, team: number, scale: number): Phaser.Sprite {
    let spriteKey: string = spritePrefix + String(team);
    let sprite: Phaser.Sprite = game.add.sprite(x, y, spriteKey);
    sprite.scale.setTo(scale, scale);
    return sprite;
  }
}
