/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export const name: string = "Too Many Lasers";
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

  export function shipDist(ship1: Ship, ship2: Ship): number {
    // If either ship is dead, return INFINITY
    if (!ship1 || ship1.health < 0 || !ship1.sprite || !ship1.body) {
      return Number.POSITIVE_INFINITY;
    }
    if (!ship2 || ship2.health < 0 || !ship2.sprite || !ship2.body) {
      return Number.POSITIVE_INFINITY;
    }

    let s1X: number = ship1.body.x;
    let s1Y: number = ship1.body.y;
    let s2X: number = ship2.body.x;
    let s2Y: number = ship2.body.y;
    let dx: number = s1X - s2X;
    let dy: number = s1Y - s2Y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  export function shipDistMinusRadius(agent: Ship, target: Ship): number {
    let dist: number = shipDist(agent, target);
    if (dist === Number.POSITIVE_INFINITY) {
      return Number.POSITIVE_INFINITY;
    }
    dist -= Math.max(agent.sprite.width, agent.sprite.height);
    dist -= Math.max(target.sprite.width, target.sprite.height);
    return dist;
  }

  export function fixAngle(radians: number): number {
    let fixed: number = radians;
    while (fixed < -Math.PI) {
      fixed += Math.PI * 2;
    }
    while (fixed > Math.PI) {
      fixed -= Math.PI * 2;
    }
    return fixed;
  }

  export function outsideMap(game: Game.Game, x: number, y: number): boolean {
    if (x < 0 || y < 0) {
      return true;
    }
    if (x > game.world.bounds.width) {
      return true;
    }
    if (y > game.world.bounds.height) {
      return true;
    }
    return false;
  }

  export function getStatusText(game: Game.Game): string {
    let soundOnText: string = "Press M to disable sound.";
    let soundOffText: string = "Press M to enable sound.";
    let pausedText: string = "Press P to resume.";
    let unpausedText: string = "Press P to pause.";
    let otherText: string = "Press Q to exit.";

    let text: string = "";

    if (game.paused) {
      return pausedText;
    } else if (Battle.started) {
      text += unpausedText;
    }

    if (game.sound.mute) {
      text += " " + soundOffText;
    } else {
      text += " " + soundOnText;
    }

    text += " " + otherText;

    return text;
  }

  export function addStatusMenu(game: Game.Game): Phaser.Text {
    let statusText: Phaser.Text = game.add.text(game.width - 10, 10, this.getStatusText(game), {
      boundsAlignH: "center",
      boundsAlignV: "middle",
      fill: "#ff0",
      font: "bold 20px Titillium Web"
    });

    statusText.anchor.x = 1;

    if (game.sound.mute) {
      statusText.setText(getStatusText(game));
    }

    game.input.onDown.add(function() {
      statusText.setText(getStatusText(game));
    }, this);

    game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add(function() {
      if (!game.paused) {
        if (game.sound.mute) {
          game.sound.mute = false;
          statusText.setText(getStatusText(game));
        } else {
          game.sound.mute = true;
          statusText.setText(getStatusText(game));
        }
      }
    }, this);

    game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.add(function() {
      if (Battle.started) {
        if (game.paused) {
          game.paused = false;
          statusText.setText(getStatusText(game));
        } else {
          game.paused = true;
          statusText.setText(getStatusText(game));
        }
      }
    }, this);

    game.input.keyboard.addKey(Phaser.Keyboard.Q).onDown.add(function() {
      if (!game.paused) {
        game.state.start("DifficultyMenu");
      }
    }, this);
    return statusText;
  }

}
