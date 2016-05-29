var megaman = {x: 0, y: 0, hp: 16};
var mobs = [];

var scene, camera, renderer, keyboard;
var loader = new THREE.TextureLoader();

var background, foreground;
var backgroundTexture, foregroundTexture;
var backgroundPlane, foregroundPlane;
var backgroundMaterial, foregroundMaterial;

// var keyboard = new THREE.KeyboardState();
var clock = new THREE.Clock();

keyboard = new KeyboardState();
init();
animate();

function init() {
  var ScreenWidth = 800, ScreenHeight = 600;
  var viewAngle = 90;
  var near = 0.1;
  var far = 50000;

    // loader.load('sprites/background/bg.png', function(t){backgroundTexture = t});
    backgroundTexture = new THREE.ImageUtils.loadTexture('sprites/background/novobg.png');
    foregroundTexture = new THREE.ImageUtils.loadTexture('sprites/background/foreground.png');

    // ScreenWidth = window.innerWidth;
    // ScreenHeight = window.innerHeight;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(ScreenWidth, ScreenHeight);

    container = document.getElementById('ThreeJS');
	  container.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(viewAngle, ScreenWidth/ScreenHeight, near, far);
    scene.add(camera);
    camera.position.set(-3700, 130, 100);
    camera.lookAt(-3700, 130, 100)

    backgroundMaterial = new THREE.MeshBasicMaterial( { map: backgroundTexture, side: THREE.DoubleSide, transparent: true } );
    foregroundMaterial = new THREE.MeshBasicMaterial( { map: foregroundTexture, side: THREE.DoubleSide, transparent: true } );

    backgroundPlane = new THREE.PlaneGeometry( 4693,460,1,1 );
    foregroundPlane = new THREE.PlaneGeometry( 7680,460,1,1 );

    background = new THREE.Mesh(backgroundPlane, backgroundMaterial);
    foreground = new THREE.Mesh(foregroundPlane, foregroundMaterial);

    background.position.set(-550,0,0);
    background.scale.set(1.5,1,1);
    foreground.position.set(0,0,20);

    scene.add(background);
    scene.add(foreground);

    var axes = new THREE.AxisHelper(1000);
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
  keyboard.update();

  var moveDistance = 50 * clock.getDelta();

  if ( keyboard.pressed("A") )
    camera.translateX( -moveDistance );

  if ( keyboard.pressed("D") )
    camera.translateX(  moveDistance );

  if ( keyboard.pressed("W") )
    camera.translateY( moveDistance );

  if ( keyboard.pressed("S") )
    camera.translateY( -moveDistance );

}
