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
      super(game, teamToShipSprite(game, x, y, "fighter_", team, 1), new State(), Fighter.FIGHTER_BASE_HEALTH, team);
    }

    public getType(): IShipSubclass {
      return Fighter;
    }

    ///// Static stuff used by fleet generation /////

    public static RESOURCE_COST: number = 5;

    public static getSupportGroups(): Array<ISupportGroup> {
      return [];
    }
  }
}
