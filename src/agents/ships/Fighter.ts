/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Fighter extends Ship {
    public static FIGHTER_BASE_HEALTH: number = 50;

    public constructor(game: Game.Game, x: number, y: number, public team: number) {
      super(game, teamToFighterSprite(game, x, y, team), new State(), Fighter.FIGHTER_BASE_HEALTH, team);
    }
  }

  function teamToFighterSprite(game: Game.Game, x: number, y: number, team: number): Phaser.Sprite {
    let spriteKey: string = "fighter_" + team;
    return game.add.sprite(x, y, spriteKey);
  }
}
