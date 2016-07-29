/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Game extends Phaser.Game {

    constructor() {
      super(2560, 1440, Phaser.AUTO, "game-container", null);

      this.state.add("Boot", Boot, false);
      this.state.add("Preloader", Preloader, false);
      this.state.add("DifficultyMenu", DifficultyMenu, false);
      this.state.add("ModeMenu", ModeMenu, false);
      this.state.add("Placement", Placement, false);
      this.state.add("Battle", Battle, false);

      this.state.start("Boot");

    }

  }
}
