class Stage {
  constructor() {
    this.foreground_image = loadImage("/sprites/stages/intro_stage/foreground.png");
    this.background_image = loadImage("/sprites/stages/intro_stage/background.png");
    this.foreground_position = createVector(0, 0);
    this.background_position = createVector(0, 0);
    this.monsters = [];
  }

  show() {
    this.foreground_image.resize(0, 920);
    this.background_image.resize(0, 920);
    image(this.background_image, this.background_position.x, this.background_position.y);
    image(this.foreground_image, this.foreground_position.x, this.foreground_position.y);
  }

  update() {

  }
}