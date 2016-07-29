/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Battle extends Phaser.State {
    static CurrentBattle: Battle = null;
    public allShips: Array<Game.Ship>;

    static started: boolean = false;
    private playButton: Phaser.Button;
    static STATUS_MENU: Phaser.Text;

    init(ships: Array<Ship>) {
      // Re-add background
      this.game.add.tileSprite(0, 0, 2560, 1440, "background");
      Battle.STATUS_MENU = addStatusMenu(this.game);

      // Reconstruct the ships
      PhysicsObject.clearObjects();

      this.allShips = new Array<Ship>();
      for (let aShip of ships) {
        let shipType: IShipSubclass = aShip.getType();
        let shipX: number = aShip.sprite.x;
        let shipY: number = aShip.sprite.y;
        let shipTeam: number = aShip.team;
        this.allShips.push(new shipType(this.game, shipX, shipY, shipTeam));
      }

      Battle.CurrentBattle = this;
    }

    preload() {
      const WORLD_WIDTH: number = this.game.world.bounds.width;
      const WORLD_HEIGHT: number = this.game.world.bounds.height;

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

    private start(): void {
      Battle.started = true;
      this.playButton.destroy();
      Battle.STATUS_MENU.setText(getStatusText(this.game));
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
      if (!Battle.started) {
        return;
      }

      let enemiesAlive: boolean = this.allShips.some(function(ship: Ship) {
        return ship.team !== 1 && ship.health > 0;
      });

      let alliesAlive: boolean = this.allShips.some(function(ship: Ship) {
        return ship.team === 1 && ship.health > 0;
      });

      if (!enemiesAlive) {
        this.addEndingText("Green team won!", this.game.world.centerX, this.game.world.centerY - 100);
      } else if (!alliesAlive) {
        this.addEndingText("Green team lost!", this.game.world.centerX, this.game.world.centerY - 100);
      }

      if (!enemiesAlive || !alliesAlive) {
        this.addEndingText("Click here play again.", this.game.world.centerX, this.game.world.centerY + 100);
        Battle.started = false;
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
