/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  interface IOurPhysicsBody extends Phaser.Physics.P2.Body {
    physicsObject: PhysicsObject;
  }

  export class PhysicsObject {
    // Collision groups - one for each team, with team 0 being obstacles etc.
    static collisionGroups: Array<Phaser.Physics.P2.CollisionGroup> = null;
    static objects: Array<PhysicsObject> = null;
    static numCollisionGroups: number = 4;

    public body: IOurPhysicsBody; // not: Phaser.Physics.P2.Body; because we need to add a field

    public constructor(game: Game.Game, public sprite: Phaser.Sprite, public health: number, public team: number) {
      //game.physics.p2.enableBody(sprite, false);
      this.sprite = sprite;
      this.body = this.sprite.body;
      // TODO: add correct shape for object...
      // this.body.clearShapes();

      // Initialize groups if needed
      if (PhysicsObject.collisionGroups == null) {
        PhysicsObject.collisionGroups = new Array<Phaser.Physics.P2.CollisionGroup>();
        for (let i: number = 0; i < PhysicsObject.numCollisionGroups; i++) {
          PhysicsObject.collisionGroups.push(game.physics.p2.createCollisionGroup());
        }
      }
      if (PhysicsObject.objects == null) {
        PhysicsObject.objects = new Array<PhysicsObject>();
      }


      // set collisions
      this.body.setCollisionGroup(PhysicsObject.collisionGroups[this.team]);
      for (let i: number = 0; i < PhysicsObject.numCollisionGroups; i++) {
        // everything collides with obstacles, and every other group besides their own.
        if (i === 0 || i !== this.team) {
          this.body.collides(PhysicsObject.collisionGroups[i], collideBodies, null);
        }
      }

      // store reference to self for access in collide
      this.body.physicsObject = this;
      PhysicsObject.objects.push(this);
    }

    public update(): void {
      // Do stuff
    }

    // TODO: ensure collide is called
    public collide(otherThing: PhysicsObject) {
      if (!otherThing) {
        return;
      }

      // Interesting concept: Kill the thing with lower health,
      // and subtract that health from the other thing's health
      if (otherThing.health < this.health) {
        this.takeDamage(otherThing.health);
        otherThing.die();
      } else if (this.health < otherThing.health) {
        otherThing.takeDamage(this.health);
        this.die();
      } else {
        // If both healths are equal, kill both
        otherThing.die();
        this.die();
      }
    }

    public takeDamage(amount: number) {
      this.health -= amount;
      if (this.health <= 0) {
        this.die();
      }
    }

    public die(): void {
      // Do stuff
      if (!this.body || !this.sprite) {
        return;
      }
      this.health = 0;
      this.sprite.destroy();
      let i: number = PhysicsObject.objects.indexOf(this);
      if (i !== -1) {
        PhysicsObject.objects.splice(i, 1);
      }
    }

    public static clearObjects(): void {
      PhysicsObject.objects = null;
      PhysicsObject.collisionGroups = null;
    }
  }

  function collideBodies(body1: IOurPhysicsBody, body2: IOurPhysicsBody) {
    if (!body1 || !body2) {
      return;
    }
    body1.physicsObject.collide(body2.physicsObject);
  }
}
