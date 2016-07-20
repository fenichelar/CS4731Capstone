/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Cruiser extends Ship {
    public static CRUISER_BASE_HEALTH: number = 250;

    public constructor(game: Game.Game, x: number, y: number, public team: number) {
      super(game, teamToCruiserSprite(game, x, y, team), new State(), Cruiser.CRUISER_BASE_HEALTH, team);
    }

    public getSupportGroups(): Array<ISupportGroup> {
      return [{
        maxDistance: 200,
        maxNumber: 10,
        shipType: Fighter
      }];
    }
  }

  function teamToCruiserSprite(game: Game.Game, x: number, y: number, team: number): Phaser.Sprite {
    let spriteKey: string = "cruiser_" + team;
    let sprite: Phaser.Sprite = game.add.sprite(x, y, spriteKey);
    sprite.scale.setTo(2, 2);
    return sprite;
  }
}
