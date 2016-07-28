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
      super(game, teamToSprite(game, x, y, "cruiser_", team, .75), new ChaseAndShoot(), Cruiser.CRUISER_BASE_HEALTH, team);
      // these will need tweaking.
      // cruisers fire more rounds, slower, larger, with more health/damage
      this.fireDelay = 1.5;
      this.roundsPerFire = 3;
      this.roundSpacing = 6;
      this.roundHealth *= 1.5;
      this.roundScale = 0.65;
      this.roundVelocity *= 0.8;
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
