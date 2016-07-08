if ((location.protocol !== "https:") && (location.hostname === "capstone.fenichelar.com")) {
  location.protocol = "https:";
}

window.onload = function() {
  let game = new Game.Game();
};
