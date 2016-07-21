/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Bullet extends PhysicsObject {
    static DefaultVelocity: number = 10;
    static DefaultHealth: number = 10;
    public constructor(game: Game.Game, public health: number, public team: number, angle: number, x: number, y: number, velocity: number) {
      super(game, teamToSprite(game, x, y, "bullet_", team, 1), health);
      this.sprite.body.angle = angle;
      this.sprite.body.thrust(velocity);
    }

    public update(): void {
      // Do stuff
    }
  }
}
