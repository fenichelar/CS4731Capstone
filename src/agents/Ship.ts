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
    public maxTurnSpeed: number = 20;
    // TODO: determine a good value for this, should be in pixels/s
    public maxThrustSpeed: number = 40;
    // TODO: determine a good value for this.
    public fireDelay: number = 5;
    private lastFireTime: number;
    public constructor(game: Game.Game, sprite: Phaser.Sprite, public state: State, public health: number, public team: number) {
      super(game, sprite, health);
      this.lastFireTime = game.time.totalElapsedSeconds();

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

    public fire() {
      let game: Game.Game = this.sprite.game;
      let now: number = game.time.totalElapsedSeconds();
      if ((now - this.lastFireTime) >= this.fireDelay) {
        let x: number = this.sprite.body.x;
        let y: number = this.sprite.body.y;
        new Bullet(game, Bullet.DefaultHealth, this.team, this.sprite.body.angle, x, y, Bullet.DefaultVelocity);
      }
    }

    public stopRotating() {
      this.sprite.body.setZeroRotation();
    }

    public turnTowards(other: Ship) {
      if (other == null) {
        return;
      }
      let dx: number = other.sprite.body.x - this.sprite.body.x;
      let dy: number = other.sprite.body.y - this.sprite.body.y;
      let angle: number = Math.atan2(dy, dx); // in radians
      /*
      let angleDelta: number = (this.sprite.body.rotation + Math.PI) - angle;
      if (angleDelta > 0) {
        this.rotate(this.maxTurnSpeed);
      } else if (angleDelta < 0) {
        this.rotate(-this.maxTurnSpeed);
      } else {
        this.stopRotating();
      }
      */
      this.sprite.body.rotation = angle - (Math.PI/2);
    }
  }
}
