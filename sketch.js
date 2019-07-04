var keyboard = new KeyboardState();
var stage;
var megaman;
var props = [];

function setup() {
	createCanvas(600, 420);
	stage = new Stage();
	megaman = new Megaman();
}

function draw() {
	stage.show();
	megaman.show();

}

function keyPressed() {
	if (keyCode == LEFT_ARROW) {
		megaman.left();
	} else if (keyCode == RIGHT_ARROW) {
		megaman.right();
	}
}