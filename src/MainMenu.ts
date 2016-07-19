/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class MainMenu extends Phaser.State {

    create() {
      makeTitle(this.game);
      this.addDifficultyText("Play Easy", Difficulty.Easy, this.game.world.centerX, this.game.world.centerY - 60);
      this.addDifficultyText("Play Medium", Difficulty.Medium, this.game.world.centerX, this.game.world.centerY + 140);
      this.addDifficultyText("Play Hard", Difficulty.Hard, this.game.world.centerX, this.game.world.centerY + 340);
    }

    startBattle(diff: Difficulty) {
      Battle.Difficulty = diff;
      this.game.state.start("Battle");
    }

    addDifficultyText(prompt: string, diff: Difficulty, x: number, y: number) {
      let promptText: Phaser.Text = this.game.add.text(x, y, prompt, {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#ff0",
        font: "bold 100px Titillium Web"
      });
      promptText.anchor.setTo(0.5, 0.5);
      promptText.inputEnabled = true;
      promptText.events.onInputDown.addOnce(function() { this.startBattle(diff) }, this);
    }

  }
}
