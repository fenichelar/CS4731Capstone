/**
 * @author Alec Fenichel <alec.fenichel@gmail.com>
 * @author Matt Schmidt
 * @author Benjamin Elder
 * @license {@link https://github.com/fenichelar/CS4731Capstone/blob/master/LICENSE.md|Apache License 2.0}
 */

if ((location.protocol !== "https:") && (location.hostname === "capstone.fenichelar.com")) {
  location.protocol = "https:";
}

window.onload = function() {
  let game = new Game.Game();
};
