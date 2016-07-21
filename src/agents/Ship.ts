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
  }

  export function teamToShipSprite(game: Game.Game, x: number, y: number, spritePrefix: string, team: number): Phaser.Sprite {
    let spriteKey: string = spritePrefix + String(team);
    return game.add.sprite(x, y, spriteKey);
  }
}
