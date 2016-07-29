/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  // these map to the enemy resource amount in FleetCompGenerator
  export enum Difficulty {
    Easy = 1.0,
    Medium = 0.9,
    Hard = 0.75
  }

  export enum Mode {
    pvp = 1,
    pve = 2,
    eve = 3
  }

  export class Placement extends Phaser.State {
    static Seed: number = 31337;
    static EnemyResourceCount: number = 3000;
    static Difficulty: Difficulty = Difficulty.Easy;
    static Mode: Mode = Mode.eve;
    static FLEET_BOUNDS_PADDING: number = 50;
    static CurrentBattle: Battle = null;
    public enemies: Array<Game.Ship> = new Array<Ship>();
    public allies: Array<Game.Ship> = new Array<Ship>();
    public allShips: Array<Game.Ship>;

    private fleetGenerator: FleetCompGenerator;
    private resourcesAvailable: number;
    private resourcesText: Phaser.Text;
    private keyCodes: Array<Phaser.Key>;
    private shouldUpdate: boolean = false;

    preload(): void {
      PhysicsObject.clearObjects();

      this.game.add.tileSprite(0, 0, 2560, 1440, "background");
      // enable p2 physics
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.physics.p2.setImpactEvents(true);
      // pick a random seed
      Placement.Seed = this.game.rnd.integer();
      // if console is open, prompt the user to select a seed
      let element = new Image();
      Object.defineProperty(element, "id", {
        get: function() {
          Placement.Seed = parseInt(prompt("Enter a seed value", Placement.Seed.toString()), 10);
        }
      });
      console.log("%cTesting if console is open.", element);
      console.log("Using seed: %i.", Placement.Seed);
      // Seed RNG with selected seed.
      this.game.rnd.sow([Placement.Seed]);

      const WORLD_WIDTH: number = this.game.world.bounds.width;
      const WORLD_HEIGHT: number = this.game.world.bounds.height;

      // Fleet generator and parameters per team
      this.fleetGenerator = new FleetCompGenerator(this.game);

      let paramsTeam1: IFleetCompParams = {
        maxX: WORLD_WIDTH / 2 - Placement.FLEET_BOUNDS_PADDING,
        maxY: WORLD_HEIGHT - Placement.FLEET_BOUNDS_PADDING,
        minX: Placement.FLEET_BOUNDS_PADDING,
        minY: Placement.FLEET_BOUNDS_PADDING,
        resources: Placement.EnemyResourceCount * Placement.Difficulty,
        teamNumber: 1,
      };

      let paramsTeam2: IFleetCompParams = {
        maxX: WORLD_WIDTH - Placement.FLEET_BOUNDS_PADDING,
        maxY: WORLD_HEIGHT - Placement.FLEET_BOUNDS_PADDING,
        minX: WORLD_WIDTH / 2 + Placement.FLEET_BOUNDS_PADDING,
        minY: Placement.FLEET_BOUNDS_PADDING,
        resources: Placement.EnemyResourceCount,
        teamNumber: 2,
      };

      // Generate enemy fleet if applicable
      this.fleetGenerator.setParams(paramsTeam2);
      if (Placement.Mode > 1) {
        this.enemies = this.fleetGenerator.generateFleet();
      } else {
        // this.enemies = this.createShips(fleetGenerator);
      }

      // Generate ally fleet if applicable
      this.fleetGenerator.setParams(paramsTeam1);
      if (Placement.Mode > 2) {
        this.allies = this.fleetGenerator.generateFleet();
      } else {
        // this.allies = this.createShips(fleetGenerator);
      }

      this.allShips = this.allies.concat(this.enemies);

      switch (Placement.Mode) {
        case Mode.pvp:
          break;
        case Mode.pve:
          this.initializePlacementUI();
          break;
        case Mode.eve:
        default:
          this.game.state.start("Battle", true, false, this.allShips);
          break;
      }
    }

    private initializePlacementUI(): void {
      this.resourcesAvailable = this.fleetGenerator.params.resources;

      this.resourcesText = this.game.add.text(10, 10, "Resources Remaining: " + this.resourcesAvailable, {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#ff0",
        font: "bold 40px Titillium Web"
      });

      // Instructions
      this.game.add.text(10, 65, "Press (key) to place, click to remove.", {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#ff0",
        font: "bold 35px Titillium Web"
      });

      let types: Array<IShipSubclass> = this.fleetGenerator.typesOrderedByCost;
      let costText: Array<Phaser.Text> = new Array<Phaser.Text>();
      let position: number = 120;
      let index: number = 1;

      for (let type of types) {
        let text: Phaser.Text = this.addShipCostText("(" + index + ") " + type.name + " Cost: " + type.RESOURCE_COST, 10, position);
        costText.push(text);
        position += 50;
        index += 1;
      }

      let x: number = this.fleetGenerator.params.minX;
      let y: number = this.fleetGenerator.params.minY;
      let width: number = this.fleetGenerator.params.maxX - this.fleetGenerator.params.minX;
      let height: number = this.fleetGenerator.params.maxY - this.fleetGenerator.params.minY;

      let graphics: Phaser.Graphics = this.game.add.graphics(0, 0);

      graphics.lineStyle(2, 0xffd900, 1);
      graphics.drawRect(x, y, width, height);

      this.keyCodes = [
        this.game.input.keyboard.addKey(Phaser.Keyboard.ONE),
        this.game.input.keyboard.addKey(Phaser.Keyboard.TWO),
        this.game.input.keyboard.addKey(Phaser.Keyboard.THREE)
      ];

      this.shouldUpdate = true;
      /*
      graphics.destroy();
      resourcesText.destroy();
      instructionsText.destroy();
      for (let text of costText) {
        text.destroy();
      }
      */
    }

    addShipCostText(text: string, x: number, y: number): Phaser.Text {
      return this.game.add.text(x, y, text, {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#ff0",
        font: "bold 30px Titillium Web"
      });
    }

    update(): void {
      if (!this.shouldUpdate) {
        return;
      }
      this.resourcesText.setText("Resources Remaining: " + this.resourcesAvailable);
      let mouseX: number = this.game.input.mousePointer.x;
      let mouseY: number = this.game.input.mousePointer.y;

      let types: Array<IShipSubclass> = this.fleetGenerator.typesOrderedByCost;

      for (let i: number = 0; i < this.keyCodes.length; i++) {
        if (this.keyCodes[i].isDown && this.resourcesAvailable >= types[i].RESOURCE_COST) {
          this.allShips.push(new types[i](this.game, mouseX, mouseY, this.fleetGenerator.params.teamNumber));
        }
      }
    }
  }
}
