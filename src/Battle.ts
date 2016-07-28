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
    static FLEET_BOUNDS_PADDING: number = 20;
    static CurrentBattle: Battle = null;
    private fleetGenerator: FleetCompGenerator;
    public allShips: Array<Game.Ship>;

    preload() {
      this.game.add.tileSprite(0, 0, 2560, 1440, "background");
      Battle.CurrentBattle = this;
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

      const WORLD_WIDTH: number = this.game.world.bounds.width;
      const WORLD_HEIGHT: number = this.game.world.bounds.height;

      // Generate enemy fleet
      let params: IFleetCompParams = {
        maxX: WORLD_WIDTH - Battle.FLEET_BOUNDS_PADDING,
        maxY: WORLD_HEIGHT - Battle.FLEET_BOUNDS_PADDING,
        minX: WORLD_WIDTH / 2 + Battle.FLEET_BOUNDS_PADDING,
        minY: Battle.FLEET_BOUNDS_PADDING,
        resources: Battle.Difficulty,
        teamNumber: 2,
      };
      this.fleetGenerator = new FleetCompGenerator(this.game, params);
      let enemies: Array<Ship> = this.fleetGenerator.generateFleet();

      // Generate ally fleet
      params.teamNumber = 1;
      params.minX = Battle.FLEET_BOUNDS_PADDING;
      params.maxX = WORLD_WIDTH / 2 - Battle.FLEET_BOUNDS_PADDING;
      this.fleetGenerator.setParams(params);
      let allies: Array<Ship> = this.fleetGenerator.generateFleet();

      this.allShips = allies.concat(enemies);

      // Build a wall and make the ships pay for it!
      // For some reason horizontal walls only go half way across so need to double width
      let wallWidth: number = 1;
      new Wall(this.game, 0, 0, WORLD_WIDTH, wallWidth, false);  // Top
      new Wall(this.game, 0, WORLD_HEIGHT - wallWidth, WORLD_WIDTH, wallWidth, false); // Bottom
      new Wall(this.game, 0, 0, wallWidth, WORLD_HEIGHT, false);  // Left
      new Wall(this.game, WORLD_WIDTH - wallWidth, 0, wallWidth, WORLD_HEIGHT, false); // Right
    }

    update() {
      for (let ship of this.allShips) {
        ship.update();
      }
    }
  }
}
