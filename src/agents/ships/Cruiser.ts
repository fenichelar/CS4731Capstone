/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Cruiser extends Ship {
    public static CRUISER_BASE_HEALTH: number = 500;
    public static CRUISER_MASS: number = 250;
    public static CRUISER_TURN_SPEED: number = 30;
    public static CRUISER_THRUST_SPEED: number = Cruiser.CRUISER_MASS * 50;
    private fireSound: any;

    public constructor(game: Game.Game, x: number, y: number, public team: number) {
      super(game, teamToSprite(game, x, y, "cruiser_", team, .75), new Idle(), Cruiser.CRUISER_BASE_HEALTH, team);
      this.body.mass = Cruiser.CRUISER_MASS;
      this.maxTurnSpeed = Cruiser.CRUISER_TURN_SPEED;
      this.maxThrustSpeed = Cruiser.CRUISER_THRUST_SPEED;
      // these will need tweaking.
      // cruisers fire more rounds, slower, larger, with more health/damage
      this.fireDelay = 1.5;
      this.roundsPerFire = 3;
      this.roundSpacing = 6;
      this.roundHealth *= 1.5;
      this.roundScale = 0.65;
      this.roundVelocity *= 0.8;
      // pew pew
      this.fireSound = game.add.audio("cruiser_fire");
    }

    public getType(): IShipSubclass {
      return Cruiser;
    }

    public playFireSound() {
      this.fireSound.play();
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
