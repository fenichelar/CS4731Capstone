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

    public started: boolean = false;
    private playButton: Phaser.Button;

    init(allShips: Array<Ship>) {
      this.allShips = allShips;
      Battle.CurrentBattle = this;
    }

    preload() {
      // Set up a Play button to trigger the fight to start
      this.playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY,
        "play", this.start, this);
      this.playButton.anchor.setTo(0.5, 0.5);
      this.playButton.scale.setTo(4, 4);
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
