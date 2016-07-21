/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  // these map to the enemy resource amount in FleetCompGenerator
  export enum Difficulty {
    Easy = 500,
    Medium = 1500,
    Hard = 5000
  }

  export class Battle extends Phaser.State {
    static Seed: number = 31337;
    static Difficulty: Difficulty = Difficulty.Easy;
    private fleetGenerator: FleetCompGenerator;
    private enemies: Array<Game.Ship>;
    private allies: Array<Game.Ship>;

    preload() {
      // enable p2 physics
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.physics.p2.setImpactEvents(true);
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

      // Generate enemy fleet
      let params: IFleetCompParams = {
        maxX: this.game.world.bounds.width,
        maxY: this.game.world.bounds.height,
        minX: this.game.world.bounds.width / 2,
        minY: 0,
        resources: Battle.Difficulty,
        teamNumber: 2,
      };
      this.fleetGenerator = new FleetCompGenerator(this.game, params);
      this.enemies = this.fleetGenerator.generateFleet();

      // Generate ally fleet
      params.teamNumber = 1;
      params.minX = 0;
      params.maxX = this.game.world.bounds.width / 2;
      this.fleetGenerator.setParams(params);
      this.allies = this.fleetGenerator.generateFleet();
    }
  }
}
