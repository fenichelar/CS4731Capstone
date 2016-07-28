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

  export enum Mode {
    pvp = 1,
    pve = 2,
    eve = 3
  }

  export class Battle extends Phaser.State {
    static Seed: number = 31337;
    static Difficulty: Difficulty = Difficulty.Easy;
    static Mode: Mode = Mode.eve;
    static FLEET_BOUNDS_PADDING: number = 50;
    static CurrentBattle: Battle = null;
    public allShips: Array<Game.Ship>;

    public started: boolean = false;
    private playButton: Phaser.Button;

    preload() {
      this.game.add.tileSprite(0, 0, 2560, 1440, "background");
      Battle.CurrentBattle = this;
      // enable p2 physics
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.physics.p2.setImpactEvents(true);
      // pick a random seed
      Battle.Seed = this.game.rnd.integer();
      // if console is open, prompt the user to select a seed
      let element = new Image();
      Object.defineProperty(element, "id", {
        get: function() {
          Battle.Seed = parseInt(prompt("Enter a seed value", Battle.Seed.toString()), 10);
        }
      });
      console.log("%cTesting if console is open.", element);
      console.log("Using seed: %i.", Battle.Seed);
      // Seed RNG with selected seed.
      this.game.rnd.sow([Battle.Seed]);

      const WORLD_WIDTH: number = this.game.world.bounds.width;
      const WORLD_HEIGHT: number = this.game.world.bounds.height;

      // Fleet generator and parameters per team
      let fleetGenerator: FleetCompGenerator = new FleetCompGenerator(this.game);

      let paramsTeam1: IFleetCompParams = {
        maxX: WORLD_WIDTH / 2 - Battle.FLEET_BOUNDS_PADDING,
        maxY: WORLD_HEIGHT - Battle.FLEET_BOUNDS_PADDING,
        minX: Battle.FLEET_BOUNDS_PADDING,
        minY: Battle.FLEET_BOUNDS_PADDING,
        resources: Battle.Difficulty * 0.75,
        teamNumber: 1,
      };

      let paramsTeam2: IFleetCompParams = {
        maxX: WORLD_WIDTH - Battle.FLEET_BOUNDS_PADDING,
        maxY: WORLD_HEIGHT - Battle.FLEET_BOUNDS_PADDING,
        minX: WORLD_WIDTH / 2 + Battle.FLEET_BOUNDS_PADDING,
        minY: Battle.FLEET_BOUNDS_PADDING,
        resources: Battle.Difficulty,
        teamNumber: 2,
      };

      // Generate enemy fleet if applicable
      let enemies: Array<Ship> = new Array<Ship>();
      if (Battle.Mode > 1) {
        fleetGenerator.setParams(paramsTeam2);
        enemies = fleetGenerator.generateFleet();
      } else {
        this.createShips(paramsTeam2);
      }

      // Generate ally fleet if applicable
      let allies: Array<Ship> = new Array<Ship>();
      if (Battle.Mode > 2) {
        fleetGenerator.setParams(paramsTeam1);
        allies = fleetGenerator.generateFleet();
      } else {
        this.createShips(paramsTeam1);
      }

      this.allShips = allies.concat(enemies);

      // Build a wall and make the ships pay for it!
      // For some reason horizontal walls only go half way across so need to double width
      let wallWidth: number = 1;
      new Wall(this.game, 0, 0, WORLD_WIDTH, wallWidth, false);  // Top
      new Wall(this.game, 0, WORLD_HEIGHT - wallWidth, WORLD_WIDTH, wallWidth, false); // Bottom
      new Wall(this.game, 0, 0, wallWidth, WORLD_HEIGHT, false);  // Left
      new Wall(this.game, WORLD_WIDTH - wallWidth, 0, wallWidth, WORLD_HEIGHT, false); // Right

      // Set up a Play button to trigger the fight to start
      this.playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY,
        "play", this.start, this);
      this.playButton.anchor.setTo(0.5, 0.5);
      this.playButton.scale.setTo(4, 4);
    }

    private createShips(params: IFleetCompParams): void {
      // ToDo
    }

    private start(): void {
      this.started = true;
      this.playButton.destroy();
    }

    update() {
      if (!this.started) {
        return;
      }

      if (PhysicsObject.objects) {
        for (let object of PhysicsObject.objects) {
          object.update();
        }
      }
    }
  }
}
