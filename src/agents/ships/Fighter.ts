/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Fighter extends Ship {
    public static FIGHTER_BASE_HEALTH: number = 100;
    public static FIGHTER_MASS: number = 50;
    public static FIGHTER_TURN_SPEED: number = 160;
    public static FIGHTER_THRUST_SPEED: number = Fighter.FIGHTER_MASS * 350;
    private fireSound: any;

    public constructor(game: Game.Game, x: number, y: number, public team: number) {
      super(game, teamToSprite(game, x, y, "fighter_", team, .5), new Idle(), Fighter.FIGHTER_BASE_HEALTH, team);
      this.body.mass = Fighter.FIGHTER_MASS;
      this.maxTurnSpeed = Fighter.FIGHTER_TURN_SPEED;
      this.maxThrustSpeed = Fighter.FIGHTER_THRUST_SPEED;
      // pew pew
      this.fireSound = game.add.audio("fighter_fire");
    }

    public getType(): IShipSubclass {
      return Fighter;
    }

    public playFireSound() {
      this.fireSound.play();
    }

    ///// Static stuff used by fleet generation /////

    public static RESOURCE_COST: number = 5;

    public static getSupportGroups(): Array<ISupportGroup> {
      return [];
    }
  }
}
