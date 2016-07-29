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
    private enemiesParams: IFleetCompParams;
    private alliesParams: IFleetCompParams;
    private enemiesResourcesAvailable: number;
    private alliesResourcesAvailable: number;
    private resourcesText: Phaser.Text;
    private instructionsText: Phaser.Text;
    private costText: Array<Phaser.Text> = new Array<Phaser.Text>();
    private keyCodes: Array<Phaser.Key>;
    private keyStates: Array<boolean>;
    private graphics: Phaser.Graphics;
    private shouldUpdate: boolean = false;

    preload(): void {
      PhysicsObject.clearObjects();

      this.graphics = this.game.add.graphics(0, 0);

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

      this.alliesParams = {
        maxX: WORLD_WIDTH / 2 - Placement.FLEET_BOUNDS_PADDING,
        maxY: WORLD_HEIGHT - Placement.FLEET_BOUNDS_PADDING,
        minX: Placement.FLEET_BOUNDS_PADDING,
        minY: Placement.FLEET_BOUNDS_PADDING,
        resources: Placement.EnemyResourceCount * Placement.Difficulty,
        teamNumber: 1,
      };

      this.enemiesParams = {
        maxX: WORLD_WIDTH - Placement.FLEET_BOUNDS_PADDING,
        maxY: WORLD_HEIGHT - Placement.FLEET_BOUNDS_PADDING,
        minX: WORLD_WIDTH / 2 + Placement.FLEET_BOUNDS_PADDING,
        minY: Placement.FLEET_BOUNDS_PADDING,
        resources: Placement.EnemyResourceCount,
        teamNumber: 2,
      };

      // Generate enemy fleet if applicable
      this.fleetGenerator.setParams(this.enemiesParams);
      this.enemiesResourcesAvailable = this.fleetGenerator.params.resources;
      if (Placement.Mode > 1) {
        this.enemies = this.fleetGenerator.generateFleet();
        this.enemiesResourcesAvailable = 0;
      }

      // Generate ally fleet if applicable
      this.fleetGenerator.setParams(this.alliesParams);
      this.alliesResourcesAvailable = this.fleetGenerator.params.resources;
      if (Placement.Mode > 2) {
        this.allies = this.fleetGenerator.generateFleet();
        this.alliesResourcesAvailable = 0;
      }

      this.initializePlacementUI();
      this.game.input.onDown.add(this.click, this);
    }

    private initializePlacementUI(): void {
      this.resourcesText = this.game.add.text(10, 10, "Resources Remaining: ", {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#ff0",
        font: "bold 40px Titillium Web"
      });

      // Instructions
      this.instructionsText = this.game.add.text(10, 65, "Press (key) to place, click to remove.", {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#ff0",
        font: "bold 35px Titillium Web"
      });

      this.costText = new Array<Phaser.Text>();

      let types: Array<IShipSubclass> = this.fleetGenerator.typesOrderedByCost;
      let position: number = 120;
      let index: number = 1;

      for (let type of types) {
        let text: Phaser.Text = this.addShipCostText("(" + index + ") " + type.name + " Cost: " + type.RESOURCE_COST, 10, position);
        this.costText.push(text);
        position += 50;
        index += 1;
      }

      this.keyCodes = [
        this.game.input.keyboard.addKey(Phaser.Keyboard.ONE),
        this.game.input.keyboard.addKey(Phaser.Keyboard.TWO),
        this.game.input.keyboard.addKey(Phaser.Keyboard.THREE)
      ];

      this.keyStates = [
        true,
        true,
        true
      ];

      this.shouldUpdate = true;
    }

    addShipCostText(text: string, x: number, y: number): Phaser.Text {
      return this.game.add.text(x, y, text, {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#ff0",
        font: "bold 30px Titillium Web"
      });
    }

    click(pointer: Phaser.Pointer): void {
      if (this.enemiesResourcesAvailable) {
        let sprites: Array<Phaser.Sprite> = new Array<Phaser.Sprite>();
        for (let enemy of this.enemies) {
          sprites.push(enemy.sprite);
        }
        let bodies: Array<Phaser.Physics.P2.Body> = this.game.physics.p2.hitTest(pointer.position, sprites);
        let index: number = -1;
        if (bodies.length > 0) {
          index = sprites.indexOf(bodies[0].sprite);
        }
        if (index > -1) {
          this.enemiesResourcesAvailable += this.enemies[index].getType().RESOURCE_COST;
          this.enemies.splice(index, 1);
        }
      } else if (this.alliesResourcesAvailable) {
        let sprites: Array<Phaser.Sprite> = new Array<Phaser.Sprite>();
        for (let ally of this.allies) {
          sprites.push(ally.sprite);
        }
        let bodies: Array<Phaser.Physics.P2.Body> = this.game.physics.p2.hitTest(pointer.position, sprites);
        let index: number = -1;
        if (bodies.length > 0) {
          index = sprites.indexOf(bodies[0].sprite);
        }
        if (index > -1) {
          this.alliesResourcesAvailable += this.allies[index].getType().RESOURCE_COST;
          this.allies.splice(index, 1);
        }
      }

    }

    update(): void {
      let x: number;
      let y: number;
      let width: number;
      let height: number;

      let resourcesAvailable: number;

      this.graphics.destroy();

      if (this.enemiesResourcesAvailable) {
        x = this.enemiesParams.minX;
        y = this.enemiesParams.minY;
        width = this.enemiesParams.maxX - this.enemiesParams.minX;
        height = this.enemiesParams.maxY - this.enemiesParams.minY;
        resourcesAvailable = this.enemiesResourcesAvailable;
      } else if (this.alliesResourcesAvailable) {
        x = this.alliesParams.minX;
        y = this.alliesParams.minY;
        width = this.alliesParams.maxX - this.alliesParams.minX;
        height = this.alliesParams.maxY - this.alliesParams.minY;
        resourcesAvailable = this.alliesResourcesAvailable;
      } else {
        this.resourcesText.destroy();
        this.instructionsText.destroy();
        for (let text of this.costText) {
          text.destroy();
        }
        this.allShips = this.allies.concat(this.enemies);
        this.game.state.start("Battle", false, false, this.allShips);
        return;
      }

      this.graphics = this.game.add.graphics(0, 0);

      this.graphics.lineStyle(2, 0xffd900, 1);
      this.graphics.drawRect(x, y, width, height);

      this.resourcesText.setText("Resources Remaining: " + resourcesAvailable);

      if (!this.shouldUpdate) {
        return;
      }

      let types: Array<IShipSubclass> = this.fleetGenerator.typesOrderedByCost;

      let mouseX: number = this.game.input.mousePointer.x;
      let mouseY: number = this.game.input.mousePointer.y;

      if (mouseX < x || mouseX > x + width || mouseY < y || mouseY > y + height) {
        return;
      }

      for (let i: number = 0; i < this.keyCodes.length; i++) {
        if (!this.keyCodes[i].isDown) {
          this.keyStates[i] = true;
        } else if (this.keyStates[i] && this.keyCodes[i].isDown && resourcesAvailable >= types[i].RESOURCE_COST) {
          this.keyStates[i] = false;
          resourcesAvailable -= types[i].RESOURCE_COST;
          if (this.enemiesResourcesAvailable) {
            this.enemiesResourcesAvailable = resourcesAvailable;
            this.enemies.push(new types[i](this.game, mouseX, mouseY, this.enemiesParams.teamNumber));
          } else if (this.alliesResourcesAvailable) {
            this.alliesResourcesAvailable = resourcesAvailable;
            this.allies.push(new types[i](this.game, mouseX, mouseY, this.alliesParams.teamNumber));
          }
        }
      }
    }
  }
}
