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
    public roundsPerFire: number = 2;
    public roundSpacing: number = 5;
    public roundVelocity: number = Bullet.DefaultVelocity;
    public roundHealth: number = Bullet.DefaultHealth;
    public roundScale: number = Bullet.DefaultScale;
    private lastFireTime: number;
    public firingArc: number;  // Radians
    public firingRange: number;

    public target: Ship;

    public constructor(game: Game.Game, sprite: Phaser.Sprite, public state: State, public health: number, team: number) {
      super(game, sprite, health, team);
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

    private angleTo(targetX: number, targetY: number): number {
      let dx: number = targetX - this.sprite.x;
      let dy: number = targetY - this.sprite.y;
      // note: phaser's angles range from -180 to 180 (in degrees)
      // 0 is upwards, therefore we need to map our angles into this range
      return fixAngle(Math.atan2(dy, dx) + (Math.PI / 2)); // in radians
    }

    private targetInFiringArc(): boolean {
      let angleToTarget: number = this.angleTo(this.target.sprite.x, this.target.sprite.y);
      let angleDelta: number = angleToTarget - this.body.rotation;

      return (Math.abs(angleDelta) < this.firingArc);
    }

    public fire() {
      if (!this.sprite || !this.body) {
        return;
      }
      let game: Game.Game = this.sprite.game;
      let now: number = game.time.totalElapsedSeconds();
      if ((now - this.lastFireTime) >= this.fireDelay && this.targetInFiringArc() && shipDist(this, this.target) <= this.firingRange) {
        let angle: number = this.sprite.rotation - Math.PI;
        let offsetAmount: number = this.roundsPerFire * this.roundSpacing / 2;
        for (let i = 0; i < this.roundsPerFire; i++) {
          let offset: number = offsetAmount + this.roundSpacing * i;
          let x: number = this.sprite.x + Math.cos(angle) * offset;
          let y: number = this.sprite.y + Math.sin(angle) * offset;
          new Bullet(game, this.roundHealth, this.team, this.body.rotation, x, y, this.roundVelocity, this.roundScale);
        }
        this.lastFireTime = now;
        // disabled for now because the current iteration is too obnoxious
        // TODO: re-visit audio
        // this.playFireSound();
      }
    }

    public playFireSound() {
      // override me
    }

    public stopRotating() {
      this.body.setZeroRotation();
    }

    public turnTowardsShip(other: Ship) {
      if (!other || !other.sprite || !other.body) {
        return;
      }
      this.turnTowards(other.sprite.x, other.sprite.y);
    }
    public turnTowards(targetX: number, targetY: number) {
      if (!this.sprite || !this.body) {
        return;
      }

      let angle: number = this.angleTo(targetX, targetY);
      /*
      if (angle < -Math.PI) {
        angle += Math.PI * 2;
      } else if (angle > Math.PI) {
        angle -= Math.PI * 2;
      }
      */
      let angleDelta: number = angle - this.sprite.body.rotation;
      if (angleDelta > 0) {
        this.rotate(this.maxTurnSpeed);
      } else if (angleDelta < 0) {
        this.rotate(-this.maxTurnSpeed);
      } else {
        this.stopRotating();
      }
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
