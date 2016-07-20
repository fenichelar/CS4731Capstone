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
      super(game, teamToBattleshipSprite(game, x, y, team), Battleship.BATTLESHIP_BASE_HEALTH, team);
    }
  }

  function teamToBattleshipSprite(game: Game.Game, x: number, y: number, team: number): Phaser.Sprite {
    let spriteKey: string = "battleship_" + team;
    return game.add.sprite(x, y, spriteKey);
  }
}
