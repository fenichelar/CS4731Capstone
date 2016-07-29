/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Battleship extends Ship {
    public static BATTLESHIP_BASE_HEALTH: number = 1400;
    public static BATTLESHIP_MASS: number = 500;
    public static BATTLESHIP_TURN_SPEED: number = 20;
    public static BATTLESHIP_THRUST_SPEED: number = Battleship.BATTLESHIP_MASS * 30;
    private fireSound: any;

    public constructor(game: Game.Game, x: number, y: number, public team: number) {
      super(game, teamToSprite(game, x, y, "battleship_", team, 1), new ChaseAndShoot(), Battleship.BATTLESHIP_BASE_HEALTH, team);
      this.body.mass = Battleship.BATTLESHIP_MASS;
      this.maxTurnSpeed = Battleship.BATTLESHIP_TURN_SPEED;
      this.maxThrustSpeed = Battleship.BATTLESHIP_THRUST_SPEED;
      // these will need tweaking.
      // battleships fire lots of rounds, slower, larger, with more health/damage
      this.fireDelay = 1.5;
      this.roundsPerFire = 5;
      this.roundSpacing = 4;
      this.roundHealth *= 2;
      this.roundScale = 0.75;
      this.roundVelocity *= 0.75;
      // pew pew
      this.fireSound = game.add.audio("battleship_fire");

      this.firingArc = Math.PI / 6;
      this.firingRange = 1200;
    }

    public getType(): IShipSubclass {
      return Battleship;
    }

    public showDamage(damage: number): void {
      let damageSprite: Phaser.Sprite;
      if (damage === 1) {
        damageSprite = this.sprite.game.make.sprite(0, 0, "battleship_damage_1");
      } else if (damage === 2) {
        damageSprite = this.sprite.game.make.sprite(0, 0, "battleship_damage_2");
      } else if (damage === 3) {
        damageSprite = this.sprite.game.make.sprite(0, 0, "battleship_damage_3");
      }

      this.sprite.addChild(damageSprite);
      damageSprite.anchor.setTo(0.5, 0.5);
    }

    public playFireSound() {
      this.fireSound.play();
    }

    ///// Static stuff used by fleet generation /////

    public static RESOURCE_COST: number = 100;

    public static getSupportGroups(): Array<ISupportGroup> {
      return [{
        maxDistance: 250,
        maxNumber: 4,
        shipType: Cruiser
      }];
    }
  }
}
