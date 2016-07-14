/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export enum Difficulty {
    Easy = 10,
    Medium = 50,
    Hard = 100
  }

  // TODO: better PCG, switch to using https://github.com/fenichelar/CS4731Capstone/pull/16
  export class Battle extends Phaser.State {
    static Seed: number = 31337;
    static Difficulty: Difficulty = Difficulty.Easy;
    private enemies: Array<Phaser.Rectangle>;
    private obstacles: Array<Phaser.Rectangle>;

    preload() {
      // Seed RNG with known seed.
      this.game.rnd.sow([Battle.Seed]);
      this.generateMap();
      this.generateEnemies();
    }

    render() {
      for (let obstacle of this.obstacles) {
        this.game.debug.geom(obstacle, "#0fffff");
      }
      for (let enemy of this.enemies) {
        this.game.debug.geom(enemy, "#000fff");
      }
    }

    generateMap() {
      // generate obstacles
      this.obstacles = new Array<Phaser.Rectangle>();
      for (let i = 0; i < Battle.Difficulty; i++) {
        let obstacle: any = this.generateObstacle();
        this.obstacles.push(obstacle);
      }
    }

    generateEnemies() {
      this.enemies = new Array<Phaser.Rectangle>();
      // generate enemy fleet
      for (let i = 0; i < Battle.Difficulty; i++) {
        let enemy: any = this.generateEnemy();
        this.enemies.push(enemy);
      }
    }

    generateObstacle() {
      let bounds: Phaser.Rectangle = this.game.world.bounds;
      let width: number = 50;
      let height: number = 50;
      let x: number = this.game.rnd.between(bounds.left + width, bounds.right - width);
      let y: number = this.game.rnd.between(bounds.bottom + height, bounds.top - height);
      console.log(x, y);
      let box: any = new Phaser.Rectangle(x, y, width, height);
      return box;
    }

    generateEnemy() {
      let bounds: Phaser.Rectangle = this.game.world.bounds;
      let width: number = 50;
      let height: number = 50;
      let x: number = this.game.rnd.between(bounds.centerX + width, bounds.right - width);
      let y: number = this.game.rnd.between(bounds.bottom + height, bounds.top - height);
      let box: any = new Phaser.Rectangle(x, y, width, height);
      console.log(x, y);
      return box;
    }
  }
}
