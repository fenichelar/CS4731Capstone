declare var Phaser: any;
declare function create(): void;
declare function preload(): void;
declare function render(): void;
declare function update(): void;

window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    create: create,
    preload: preload,
    render: render,
    update: update
  });
};
