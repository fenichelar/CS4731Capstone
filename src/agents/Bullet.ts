/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Bullet extends PhysicsObject {
    static DefaultVelocity: number = 1000;
    static DefaultHealth: number = 8;
    static DefaultScale: number = .5;
    public lifespan: number = 1; // 1 second
    public spawnTime: number;
    public constructor(game: Game.Game, public health: number, team: number, private angle: number, x: number, y: number, private velocity: number, public scale: number) {
      super(game, teamToSprite(game, x, y, "bullet_", team, scale), health, team);
      this.sprite.rotation = angle;
      let angleR: number = this.sprite.rotation - (Math.PI / 2);
      this.body.velocity.x = Math.cos(angleR) * velocity;
      this.body.velocity.y = Math.sin(angleR) * velocity;
      this.body.mass = 0.001;
      this.spawnTime = game.time.totalElapsedSeconds();
    }

    update() {
      let now: number = this.sprite.game.time.totalElapsedSeconds();
      // bullets don't spin, but otherwise have proper physics
      this.body.rotation = this.angle;
      let angleR: number = this.body.rotation - (Math.PI / 2);
      this.body.velocity.x = Math.cos(angleR) * this.velocity;
      this.body.velocity.y = Math.sin(angleR) * this.velocity;
      // bullets die after they've lived out their lifespawn
      if ((now - this.spawnTime) > this.lifespan) {
        this.die();
      }
    }
  }
}
