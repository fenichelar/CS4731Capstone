/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export interface IShipSubclass {
    new (position: IPosition, team: number): Ship;
  }

  export interface ISupportGroup {
    shipType: IShipSubclass;
    maxDistance: number;
    maxNumber: number;
  }

  export class Ship extends PhysicsObject {
    public constructor(public sprite: Phaser.Sprite,
                      public health: number, public team: number) {
      super(health);
    }

    public update(): void {
      // Do stuff
    }

    public collide(otherThing: PhysicsObject): void {
      // Don't do ship-to-ship collision for now
      if (!(otherThing instanceof Ship)) {
        super.collide(otherThing);
      }
    }

    public getSupportGroups(): Array<ISupportGroup> {
      return [];
    }
  }
}
