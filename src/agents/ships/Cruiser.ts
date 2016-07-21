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
      super(game, teamToShipSprite(game, x, y, "cruiser_", team, 1.5), new State(), Cruiser.CRUISER_BASE_HEALTH, team);
    }

    public getType(): IShipSubclass {
      return Cruiser;
    }

    ///// Static stuff used by fleet generation /////

    public static RESOURCE_COST: number = 25;

    public static getSupportGroups(): Array<ISupportGroup> {
          return [{
            maxDistance: 200,
            maxNumber: 10,
            shipType: Fighter
          }];
        }
      }
}
