/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Wall extends PhysicsObject {
    // This is basically a dummy object
    public constructor(game: Game.Game, x: number, y: number, width: number, height: number, visible: boolean) {
      super(game, Wall.createWallSprite(game, x, y, width, height, visible), 0, 0);
      this.body.kinematic = true;
    }

    private static createWallSprite(game: Game.Game, x: number, y: number, width: number, height: number, visible: boolean): Phaser.Sprite {
      let sprite: Phaser.Sprite = game.add.sprite(x, y, visible ? "red-pixel" : "transparent-pixel");
      sprite.scale.setTo(width * 2, height * 2);
      return sprite;
    }

    public update(): void {
      // Walls don't do anything!
    }

    public collide(otherThing: PhysicsObject): void {
      // Walls only interact in the physics engine
      // But some things just plain die when they hit them
      if (otherThing instanceof Bullet) {
        otherThing.die();
      }
    }

    public takeDamage(amount: number): void {
      // Walls don't take damage!
    }

    public die(): void {
      // Walls can't die!
    }
  }
}
