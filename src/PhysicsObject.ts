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
    // Collision groups - one for ships and one for everything else
    static shipsCollisionGroup: Phaser.Physics.P2.CollisionGroup = null;
    static nonShipsCollisionGroup: Phaser.Physics.P2.CollisionGroup = null;

    public body: IOurPhysicsBody; // not: Phaser.Physics.P2.Body; because we need to add a field

    public constructor(game: Game.Game, public sprite: Phaser.Sprite, public health: number) {
      game.physics.p2.enableBody(sprite, false);
      this.body = sprite.body;
      // TODO: add correct shape for object...
      // this.body.clearShapes();

      // Initialize collision groups if needed
      if (PhysicsObject.shipsCollisionGroup == null) {
        PhysicsObject.shipsCollisionGroup = game.physics.p2.createCollisionGroup();
      }
      if (PhysicsObject.nonShipsCollisionGroup == null) {
        PhysicsObject.nonShipsCollisionGroup = game.physics.p2.createCollisionGroup();
      }

      // Ships don't collide with other ships
      if (this instanceof Ship) {
        this.body.setCollisionGroup(PhysicsObject.shipsCollisionGroup);
      } else {
        this.body.setCollisionGroup(PhysicsObject.nonShipsCollisionGroup);
        this.body.collides(PhysicsObject.shipsCollisionGroup, collideBodies, null);
      }

      // Everything collides with non-ships
      this.body.collides(PhysicsObject.nonShipsCollisionGroup, collideBodies, null);
      this.body.physicsObject = this;
    }

    public update(): void {
      // Do stuff
    }

    // TODO: ensure collide is called
    public collide(otherThing: PhysicsObject) {
      // Interesting concept: Kill the thing with lower health,
      // and subtract that health from the other thing's health
      if (otherThing.health < this.health) {
        this.health -= otherThing.health;
        otherThing.die();

        // If we dropped below 0, die
        if (this.health <= 0) {
          this.die();
        }
      } else if (this.health < otherThing.health) {
        otherThing.health -= this.health;
        this.die();

        // If we dropped below 0, die
        if (otherThing.health <= 0) {
          otherThing.die();
        }
      } else {
        // If both healths are equal, kill both
        otherThing.die();
        this.die();
      }
    }

    public die(): void {
      // Do stuff
      if (this.body == null || this.body.sprite == null) {
        return;
      }
      this.health = 0;
      this.body.sprite.destroy();
    }
  }

  function collideBodies(body1: IOurPhysicsBody, body2: IOurPhysicsBody) {
    if (body1 == null || body2 == null) {
      return;
    }
    body1.physicsObject.collide(body2.physicsObject);
  }
}
