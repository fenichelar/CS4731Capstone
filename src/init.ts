if ((location.protocol != "https:") && (location.hostname == "capstone.fenichelar.com")) {
  location.protocol = "https:";
}

window.onload = function() {
  var game = new Game.Game();
};
