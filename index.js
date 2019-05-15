var scene, camera, renderer, keyboard;

var updateClock;

var clock = new THREE.Clock();
keyboard = new KeyboardState();

init();
animate();