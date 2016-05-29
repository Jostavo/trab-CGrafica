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
animate();

function init() {
  var ScreenWidth = 800, ScreenHeight = 600;
  var viewAngle = 30;
  var near = 0.1;
  var far = 10000;

    loader.load('sprites/background/background.png', function(t){backgroundTexture = t;});
    loader.load('sprites/background/foreground.png', function(t){foregroundTexture = t});

    // ScreenWidth = window.innerWidth;
    // ScreenHeight = window.innerHeight;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(ScreenWidth, ScreenHeight);

    container = document.getElementById('ThreeJS');
	  container.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(viewAngle, ScreenWidth/ScreenHeight, near, far);
    scene.add(camera);
    camera.position.set(-50,0,-100);
    camera.lookAt(scene.position);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    backgroundMaterial = new THREE.MeshBasicMaterial( { map: backgroundTexture, side: THREE.DoubleSide } );
    foregroundMaterial = new THREE.MeshBasicMaterial( { map: foregroundTexture, side: THREE.DoubleSide } );

    backgroundPlane = new THREE.PlaneGeometry( 10,10 );
    foregroundPlane = new THREE.PlaneGeometry( 10,10 );

    background = new THREE.Mesh(backgroundPlane, backgroundMaterial);
    foreground = new THREE.Mesh(foregroundPlane, foregroundMaterial);
    background.position.set(0,0,0);
    foreground.position.set(0,0,-10);

    scene.add(background);
    scene.add(foreground);

    var axes = new THREE.AxisHelper(100);
	  scene.add( axes );

    // renderer.setClearColor( new THREE.Color(0xffffff), 1);

    renderer.render(scene, camera);
}

function animate()
{
    requestAnimationFrame( animate );
	  renderer.render(scene, camera);
	  update();
}

function update()
{
	controls.update();
	stats.update();
}
