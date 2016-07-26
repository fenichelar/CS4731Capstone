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
    public maxThrustSpeed: number = 50;
    // TODO: determine a good value for this.
    public fireDelay: number = 1;
    private lastFireTime: number;

    public target: Ship;

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
      this.body.angle = angle;
    }

    public update(): void {
      // Do stuff
      this.state = this.state.update(this);

      // Make sure we don't stay alive when we shouldn't
      if (this.health <= 0) {
        this.die();
      }
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

    // positive rotates right, negative rotates left
    public rotate(speed: number) {
      if (speed > this.maxTurnSpeed) {
        speed = this.maxTurnSpeed;
      } else if (speed < -this.maxTurnSpeed) {
        speed = -this.maxTurnSpeed;
      }

      // If speed is negative, this will go left
      this.body.rotateRight(speed);
    }

    // positive moves forward, negative moves backwards
    public thrust(speed: number) {
      if (speed > this.maxThrustSpeed) {
        speed = this.maxThrustSpeed;
      } else if (speed < -this.maxThrustSpeed) {
        speed = -this.maxThrustSpeed;
      }

      // If speed is negative, this will go backwards
      this.body.thrust(speed);
    }

    public fire() {
      if (!this.sprite || !this.body) {
        return;
      }
      let game: Game.Game = this.sprite.game;
      let now: number = game.time.totalElapsedSeconds();
      if ((now - this.lastFireTime) >= this.fireDelay) {
        let offsetScale: number = Math.max(this.sprite.width, this.sprite.height);
        let angle: number = this.sprite.rotation - (Math.PI / 2);
        let x: number = this.sprite.x + Math.cos(angle) * offsetScale;
        let y: number = this.sprite.y + Math.sin(angle) * offsetScale;
        new Bullet(game, Bullet.DefaultHealth, this.team, this.body.rotation, x, y, Bullet.DefaultVelocity);
        this.lastFireTime = now;
      }
    }

    public stopRotating() {
      this.body.setZeroRotation();
    }

    public turnTowards(other: Ship) {
      if (!this.sprite || !this.body || !other || !other.sprite || !other.body) {
        return;
      }

      let dx: number = other.sprite.x - this.sprite.x;
      let dy: number = other.sprite.y - this.sprite.y;
      let angle: number = Math.atan2(dy, dx) + (Math.PI / 2); // in radians
      // TODO: use something like the code below to do physics based rotation
      /*
      let angleDelta: number = angle - this.sprite.body.rotation;
      if (angleDelta > 0) {
        this.rotate(this.maxTurnSpeed);
      } else if (angleDelta < 0) {
        this.rotate(-this.maxTurnSpeed);
      } else {
        this.stopRotating();
      }*/
      this.body.rotation = angle;
    }

    public die(): void {
      super.die();

      // Remove ourselves from the list of ships
      if (Battle.CurrentBattle && Battle.CurrentBattle.allShips) {
        for (let i: number = 0; i < Battle.CurrentBattle.allShips.length; i++) {
          if (Battle.CurrentBattle.allShips[i] === this) {
            Battle.CurrentBattle.allShips.splice(i, 1);
            break;
          }
        }
      }
    }

    public selectTargetFrom(allShips: Array<Ship>): Ship {
      // By default, pick the closest enemy ship
      let closestEnemy: Ship = null;
      for (let otherShip of allShips) {
        if (this.team !== otherShip.team && shipDist(this, otherShip) < shipDist(this, closestEnemy)) {
          closestEnemy = otherShip;
        }
      }
      return closestEnemy;
    }
  }
}
