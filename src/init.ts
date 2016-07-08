if ((location.protocol != "https:") && (location.hostname == "capstone.fenichelar.com")) {
  location.protocol = "https:";
}

window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container');
  game.state.add('MainMenu', Game.MainMenu);
  game.state.add('TitleScreen', Game.TitleScreen);
  // TODO: add other states here.
  game.state.start('TitleScreen');
};
