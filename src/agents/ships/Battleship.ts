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
      super(game, teamToShipSprite(game, x, y, "battleship_", team), new State(), Battleship.BATTLESHIP_BASE_HEALTH, team);
    }

    public getType(): IShipSubclass {
      return Battleship;
    }

    ///// Static stuff used by fleet generation /////

    public static RESOURCE_COST: number = 100;

    public static getSupportGroups(): Array<ISupportGroup> {
      return [{
        maxDistance: 500,
        maxNumber: 3,
        shipType: Cruiser
      }];
    }
  }
}
