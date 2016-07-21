/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export interface IShipSubclass {
    new (game: Game, x: number, y: number, team: number): Ship;
    getSupportGroups(): Array<ISupportGroup>;
    RESOURCE_COST: number;
  }

  export interface ISupportGroup {
    shipType: IShipSubclass;
    maxDistance: number;
    maxNumber: number;
  }

  export class Ship extends PhysicsObject {
    // TODO: rotation speed's unit doesn't seem to be defined in the docs.
    // We need to determine reasonable values for this.
    // Also, ship types should probably rotate at different speeds.
    public maxTurnSpeed: number = 1;
    // TODO: determine a good value for this, should be in pixels/s
    public maxThrustSpeed: number = 3;
    public constructor(game: Game.Game, sprite: Phaser.Sprite, public state: State, public health: number, public team: number) {
      super(game, sprite, health);

      // Super constructor enables body
      // Set orientation based on team
      let angle: number = 0;
      switch (team) {
        case 1:
          angle = 90;
          break;
        case 2:
          angle = -90;
          break;
        default: angle = 0;
      }

      this.sprite.body.angle = angle;
    }

    public update(): void {
      // Do stuff
      this.state = this.state.update(this);
    }

    public collide(otherThing: PhysicsObject): void {
      // Don't do ship-to-ship collision for now
      if (!(otherThing instanceof Ship)) {
        super.collide(otherThing);
      }
    }

    public getType(): IShipSubclass {
      // Ship isn't a ship subclass, we'll never instantiate it directly
      return null;
    }

    // positive rotates left, negative rotates right
    public rotate(speed: number) {
      if (speed < 0) {
        speed = -speed;
        if (speed > this.maxTurnSpeed) {
          speed = this.maxTurnSpeed;
        }
        this.sprite.body.rotateRight(speed);
      } else if (speed > this.maxTurnSpeed) {
        speed = this.maxTurnSpeed;
      }
      this.sprite.body.rotateLeft(speed);
    }

    // positive moves forward, negative moves backwards
    public thrust(speed: number) {
      if (speed < 0) {
        speed = -speed;
        if (speed > this.maxThrustSpeed) {
          speed = this.maxThrustSpeed;
        }
        this.sprite.body.reverse(speed);
      } else {
        if (speed > this.maxThrustSpeed) {
          speed = this.maxThrustSpeed;
        }
        this.sprite.body.thrust(speed);
      }
    }
  }

  export function teamToShipSprite(game: Game.Game, x: number, y: number, spritePrefix: string, team: number, scale: number): Phaser.Sprite {
    let spriteKey: string = spritePrefix + String(team);
    let sprite: Phaser.Sprite = game.add.sprite(x, y, spriteKey);
    sprite.scale.setTo(scale, scale);
    return sprite;
  }
}
