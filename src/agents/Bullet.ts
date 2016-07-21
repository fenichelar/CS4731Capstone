/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Bullet extends PhysicsObject {
    static DefaultVelocity: number = 100;
    static DefaultHealth: number = 0.000001;
    public constructor(game: Game.Game, public health: number, public team: number, angle: number, x: number, y: number, velocity: number) {
      super(game, teamToSprite(game, x, y, "bullet_", team, 1), health);
      this.sprite.body.rotation = angle;
      let angleR: number = this.sprite.body.rotation - (Math.PI / 2);
      this.sprite.body.velocity.x = Math.cos(angleR) * velocity;
      this.sprite.body.velocity.y = Math.sin(angleR) * velocity;
      this.sprite.body.thrust(velocity);
      this.sprite.body.mass = 0.001;
    }

    public update(): void {
      // Do stuff
    }
  }
}
