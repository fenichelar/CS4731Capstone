/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Battleship extends Ship {
    public static BATTLESHIP_BASE_HEALTH: number = 1000;

    public constructor(game: Game.Game, x: number, y: number, public team: number) {
      super(game, teamToBattleshipSprite(game, x, y, team), new State(), Battleship.BATTLESHIP_BASE_HEALTH, team);
    }

    public getSupportGroups(): Array<ISupportGroup> {
      return [{
        maxDistance: 500,
        maxNumber: 3,
        shipType: Cruiser
      }];
    }
  }

  function teamToBattleshipSprite(game: Game.Game, x: number, y: number, team: number): Phaser.Sprite {
    let spriteKey: string = "battleship_" + team;
    let sprite: Phaser.Sprite = game.add.sprite(x, y, spriteKey);
    sprite.scale.setTo(2, 2);
    return sprite;
  }
}
