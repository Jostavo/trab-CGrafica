var megaman = {x: 0, y: 0, hp: 16};
var mobs = [];

var scene, camera, renderer, controls;
var loader = new THREE.TextureLoader();

var background, foreground;
var backgroundTexture, foregroundTexture;
var backgroundPlane, foregroundPlane;
var backgroundMaterial, foregroundMaterial;

// var keyboard = new THREE.KeyboardState();
var clock = new THREE.Clock();

init();
renderer.render(scene, camera);

function init() {
  var ScreenWidth, ScreenHeight;
  var viewAngle = 0;
  var aspect;
  var near = 0.1;
  var far = 20000;

    backgroundTexture = loader.load( 'sprites/background/background.png' );
    foregroundTexture = loader.load( 'sprites/background/foreground.png' );

    scene = new THREE.Scene();

    ScreenWidth = window.innerWidth;
    ScreenHeight = window.innerHeight;

    aspect = ScreenWidth/ScreenHeight;

    camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
    scene.add(camera);
    camera.position.set(0,0,10);
    camera.lookAt(scene.position);

	  renderer = new THREE.WebGLRenderer( {antialias:true} );
    renderer.setSize(ScreenWidth, ScreenHeight);

    // container = document.getElementById('ThreeJS');
	  // container.appendChild( renderer.domElement );

    // controls = new THREE.MMXControls(camera, renderer.domElement);

    // var light = new THREE.PointLight(0xffffff);
	  // light.position.set(100,250,100);
	  // scene.add(light

    backgroundMaterial = new THREE.MeshBasicMaterial( { map: backgroundTexture, side: THREE.FrontSide } );
    foregroundMaterial = new THREE.MeshBasicMaterial( { map: foregroundTexture, side: THREE.DoubleSide } );

    backgroundPlane = new THREE.PlaneGeometry( 3545,352 );
    foregroundPlane = new THREE.PlaneGeometry( 7680,460 );

    background = new THREE.Mesh(backgroundPlane, backgroundMaterial);
    foreground = new THREE.Mesh(foregroundPlane, foregroundMaterial);

    scene.add(background);
    scene.add(foreground);
}
