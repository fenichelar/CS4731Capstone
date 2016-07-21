/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class PhysicsObject {
    static AllObjectsCollisionGroup: Phaser.Physics.P2.CollisionGroup = null;
    public body: any; // not: Phaser.Physics.P2.Body; because we need to add a field
    public constructor(game: Game.Game, public sprite: Phaser.Sprite, public health: number) {
      game.physics.p2.enableBody(sprite, false);
      this.body = sprite.body;
      // TODO: add correct shape for object...
      // this.body.clearShapes();
      if (PhysicsObject.AllObjectsCollisionGroup == null) {
        PhysicsObject.AllObjectsCollisionGroup = game.physics.p2.createCollisionGroup();
      }
      this.body.setCollisionGroup(PhysicsObject.AllObjectsCollisionGroup);
      this.body.collides(PhysicsObject.AllObjectsCollisionGroup, collideBodies, null);
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
      } else if (this.health < otherThing.health) {
        otherThing.health -= this.health;
        this.die();
      } else {
        // If both healths are equal, kill both
        otherThing.die();
        this.die();
      }
    }

    public die(): void {
      // Do stuff
      this.body.sprite.destroy();
    }
  }

  function collideBodies(body1: any, body2: any) {
    if (body1 == null || body2 == null) {
      return;
    }
    if (!("physicsObject" in body1) || !("physicsObject" in body2)) {
      return;
    }
    body1.physicsObject.collide(body2.physicsObject);
  }
}
