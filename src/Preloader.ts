/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

namespace Game {
  export class Preloader extends Phaser.State {

    preloadBar: Phaser.Sprite;

    preload() {
      makeTitle(this.game);

      this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "preloadBar");
      this.preloadBar.anchor.setTo(0.5, 0.5);
      this.load.setPreloadSprite(this.preloadBar);
      this.preloadBar.scale.setTo(4, 4);
      // Load assets here
      this.load.image("background", "assets/Backgrounds/darkPurple.png");
      // fighters
      this.load.image("fighter_1", "assets/playerShip1_green.png");
      this.load.image("fighter_2", "assets/playerShip1_red.png");
      this.load.image("fighter_3", "assets/playerShip1_blue.png");
      // this.load.image("fighter_4", "assets/playerShip1_orange.png");
      // cruisers
      this.load.image("cruiser_1", "assets/playerShip2_green.png");
      this.load.image("cruiser_2", "assets/playerShip2_red.png");
      this.load.image("cruiser_3", "assets/playerShip2_blue.png");
      // this.load.image("cruiser_4", "assets/playerShip2_orange.png");
      // battleships
      this.load.image("battleship_1", "assets/playerShip3_green.png");
      this.load.image("battleship_2", "assets/playerShip3_red.png");
      this.load.image("battleship_3", "assets/playerShip3_blue.png");
      // this.load.image("battleship_4", "assets/playerShip3_orange.png");
      // bullets
      this.load.image("bullet_1", "assets/Lasers/laserGreen05.png");
      this.load.image("bullet_2", "assets/Lasers/laserRed03.png");
      this.load.image("bullet_3", "assets/Lasers/laserBlue03.png");
      // NOTE: orange lasers do not exist currently...
      // this.load.image("bullet_4", "assets/Lasers/laserOrange03.png");

      // Load damage overlays
      this.load.image("fighter_damage_1", "assets/Damage/playerShip1_damage1.png");
      this.load.image("fighter_damage_2", "assets/Damage/playerShip1_damage2.png");
      this.load.image("fighter_damage_3", "assets/Damage/playerShip1_damage3.png");
      this.load.image("cruiser_damage_1", "assets/Damage/playerShip2_damage1.png");
      this.load.image("cruiser_damage_2", "assets/Damage/playerShip2_damage2.png");
      this.load.image("cruiser_damage_3", "assets/Damage/playerShip2_damage3.png");
      this.load.image("battleship_damage_1", "assets/Damage/playerShip3_damage1.png");
      this.load.image("battleship_damage_2", "assets/Damage/playerShip3_damage2.png");
      this.load.image("battleship_damage_3", "assets/Damage/playerShip3_damage3.png");

      // Walls can be visible or invisible
      this.load.image("red-pixel", "assets/red-pixel.png");
      this.load.image("transparent-pixel", "assets/transparent-pixel.png");

      this.load.image("play", "assets/play.png");

      // load laser sounds
      this.load.audio("fighter_fire", "assets/Sounds/SoundsCrate-SciFi-Laser4.mp3");
      this.load.audio("cruiser_fire", "assets/Sounds/SoundsCrate-SciFi-Laser3.mp3");
      this.load.audio("battleship_fire", "assets/Sounds/SoundsCrate-SciFi-Laser5.mp3");
    }

    create() {
      const pressKeyText: string = "Click anywhere to start...";
      const pressKeyX: number = this.game.world.centerX;
      const pressKeyY: number = this.game.world.centerY + this.game.height * 0.25;
      let pressKey: any = this.game.add.text(pressKeyX, pressKeyY, pressKeyText, {
        boundsAlignH: "center",
        boundsAlignV: "middle",
        fill: "#ff0",
        font: "80px Titillium Web"
      });
      this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "preloadBar");
      this.preloadBar.anchor.setTo(0.5, 0.5);
      this.preloadBar.scale.setTo(4, 4);
      pressKey.anchor.setTo(0.5, 0.5);

      this.input.onDown.addOnce(this.startDifficultyMenu, this);
    }

    startDifficultyMenu() {
      this.game.state.start("DifficultyMenu");
    }

  }
}
