if ((location.protocol != "https:") && (location.hostname == "capstone.fenichelar.com")) {
    location.protocol = "https:";
}
window.onload = function () {
    var game = new Phaser.Game({
        width: 800,
        height: 600,
        renderer: Phaser.AUTO,
        parent: 'game-container',
        create: create,
        preload: preload,
        render: render,
        update: update
    });
};
