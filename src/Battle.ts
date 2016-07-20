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

  export class Battle extends Phaser.State {
    static Seed: number = 31337;
    static Difficulty: Difficulty = Difficulty.Easy;
    private EnemyFleetGenerator: FleetCompGenerator;
    private enemies: Array<Game.Ship>;

    preload() {
      // enable p2 physics
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      // Seed RNG with known seed.
      let element = new Image();
      Object.defineProperty(element, "id", {
        get: function() {
          Battle.Seed = parseInt(prompt("Enter a seed value", Battle.Seed.toString()), 10);
        }
      });
      console.log("%cTesting if console is open.", element);
      console.log("Using seed: %i.", Battle.Seed);
      this.game.rnd.sow([Battle.Seed]);
      this.EnemyFleetGenerator = new FleetCompGenerator(this.game);
      this.enemies = this.EnemyFleetGenerator.generateFleet();
    }
  }
}
