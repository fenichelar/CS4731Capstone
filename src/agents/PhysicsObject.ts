/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class PhysicsObject {
    public body: Phaser.Physics.P2.Body;
    public constructor(game: Game.Game, public sprite: Phaser.Sprite, public health: number) {
      game.physics.p2.enableBody(sprite, false);
      this.body = game.physics.p2.getBody(sprite);
      this.body.clearShapes();
      // TODO: add correct shape for object...
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
    }
  }
}
