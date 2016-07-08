module Game {
  export class Game extends Phaser.Game {

    constructor() {
      super(800, 600, Phaser.AUTO, "game-container", null);

      this.state.add("Boot", Boot, false);
      this.state.add("Preloader", Preloader, false);
      this.state.add("TitleScreen", TitleScreen, false);
      this.state.add("MainMenu", MainMenu, false);

      this.state.start("Boot");

    }

  }
}
