/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  // these map to the enemy resource amount in FleetCompGenerator
  export enum Difficulty {
    Easy = 0.8,
    Medium = 0.6,
    Hard = 0.4
  }

  export enum Mode {
    pvp = 1,
    pve = 2,
    eve = 3
  }

  export class Battle extends Phaser.State {
    static Seed: number = 31337;
    static EnemyShipCount: number = 2000;
    static Difficulty: Difficulty = Difficulty.Easy;
    static Mode: Mode = Mode.eve;
    static FLEET_BOUNDS_PADDING: number = 50;
    static CurrentBattle: Battle = null;
    public enemies: Array<Game.Ship> = new Array<Ship>();
    public allies: Array<Game.Ship> = new Array<Ship>();
    public allShips: Array<Game.Ship>;

    public started: boolean = false;
    private playButton: Phaser.Button;

    preload() {
      PhysicsObject.clearObjects();

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
        resources: Battle.EnemyShipCount * Battle.Difficulty,
        teamNumber: 1,
      };

      let paramsTeam2: IFleetCompParams = {
        maxX: WORLD_WIDTH - Battle.FLEET_BOUNDS_PADDING,
        maxY: WORLD_HEIGHT - Battle.FLEET_BOUNDS_PADDING,
        minX: WORLD_WIDTH / 2 + Battle.FLEET_BOUNDS_PADDING,
        minY: Battle.FLEET_BOUNDS_PADDING,
        resources: Battle.EnemyShipCount,
        teamNumber: 2,
      };

      // Generate enemy fleet if applicable
      if (Battle.Mode > 1) {
        fleetGenerator.setParams(paramsTeam2);
        this.enemies = fleetGenerator.generateFleet();
      } else {
        this.createShips(paramsTeam2);
      }

      // Generate ally fleet if applicable
      if (Battle.Mode > 2) {
        fleetGenerator.setParams(paramsTeam1);
        this.allies = fleetGenerator.generateFleet();
      } else {
        this.createShips(paramsTeam1);
      }

      this.allShips = this.allies.concat(this.enemies);

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

    addEndingText(prompt: string, x: number, y: number) {
      let promptText: Phaser.Text = this.game.add.text(x, y, prompt, {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#ff0",
        font: "bold 100px Titillium Web"
      });
      promptText.anchor.setTo(0.5, 0.5);
      promptText.inputEnabled = true;
      promptText.events.onInputDown.addOnce(function() {
        this.game.state.start("DifficultyMenu");
      }, this);
    }

    update() {
      if (!this.started) {
        return;
      }

      let enemiesAlive: boolean = this.enemies.some(function(ship: Ship) {
        return ship.health > 0;
      });

      let alliesAlive: boolean = this.allies.some(function(ship: Ship) {
        return ship.health > 0;
      });

      if (!enemiesAlive) {
        this.addEndingText("Green team won!", this.game.world.centerX, this.game.world.centerY - 100);
      } else if (!alliesAlive) {
        this.addEndingText("Green team lost!", this.game.world.centerX, this.game.world.centerY - 100);
      }

      if (!enemiesAlive || !alliesAlive) {
        this.addEndingText("Click to play again.", this.game.world.centerX, this.game.world.centerY + 100);
        this.started = false;
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
