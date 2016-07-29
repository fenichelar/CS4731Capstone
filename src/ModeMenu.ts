/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class ModeMenu extends Phaser.State {
    static Difficulty: Difficulty;

    create() {
      this.game.add.tileSprite(0, 0, 2560, 1440, "background");
      addSoundToggle(this.game);
      makeTitle(this.game);
      this.addModeText("Player vs Player", Mode.pvp, this.game.world.centerX, this.game.world.centerY - 60);
      this.addModeText("Player vs AI", Mode.pve, this.game.world.centerX, this.game.world.centerY + 140);
      this.addModeText("AI vs AI", Mode.eve, this.game.world.centerX, this.game.world.centerY + 340);
    }

    startBattle(mode: Mode) {
      Placement.Difficulty = ModeMenu.Difficulty;
      Placement.Mode = mode;
      this.game.state.start("Placement");
    }

    addModeText(prompt: string, mode: Mode, x: number, y: number) {
      let promptText: Phaser.Text = this.game.add.text(x, y, prompt, {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#ff0",
        font: "bold 100px Titillium Web"
      });
      promptText.anchor.setTo(0.5, 0.5);
      promptText.inputEnabled = true;
      promptText.events.onInputDown.addOnce(function() {
        this.startBattle(mode);
      }, this);
    }

  }
}
