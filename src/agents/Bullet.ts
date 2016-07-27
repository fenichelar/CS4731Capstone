/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Bullet extends PhysicsObject {
    static DefaultVelocity: number = 100;
    static DefaultHealth: number = 10;
    public constructor(game: Game.Game, public health: number, team: number, private angle: number, x: number, y: number, velocity: number) {
      super(game, teamToSprite(game, x, y, "bullet_", team, .5), health, team);
      this.body.rotation = angle;
      let angleR: number = this.body.rotation - (Math.PI / 2);
      this.body.velocity.x = Math.cos(angleR) * velocity;
      this.body.velocity.y = Math.sin(angleR) * velocity;
      this.body.thrust(velocity);
      this.body.mass = 0.001;
    }

    update() {
      this.body.rotation = this.angle;
    }
  }
}
