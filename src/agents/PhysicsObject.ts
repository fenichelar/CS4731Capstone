/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

namespace Game {
  export class PhysicsObject {
    public constructor(public health: number) { }

    public update(): void {
      // Do stuff
    }

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
