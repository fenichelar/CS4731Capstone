window.onload = function () {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        create: create,
        preload: preload,
        render: render,
        update: update
    });
};
