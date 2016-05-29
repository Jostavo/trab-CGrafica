var megaman = {x: 0, y: 0, hp: 16};
var mobs = [];

var scene, camera, renderer, keyboard, animation;

var background, foreground;
var backgroundTexture, foregroundTexture;
var backgroundPlane, foregroundPlane;
var backgroundMaterial, foregroundMaterial;
var megamanImg;
var megamanTexture;
var megamanPlane;
var megamanMaterial;

var esquerda = false;

// var keyboard = new THREE.KeyboardState();
var clock = new THREE.Clock();

keyboard = new KeyboardState();
init();
animate();

function init() {
  var ScreenWidth = 800, ScreenHeight = 600;
  var viewAngle = 90;
  var near = 0.1;
  var far = 2000;

    backgroundTexture = new THREE.ImageUtils.loadTexture('sprites/background/novobg.png');
    megamanTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/mmx.png');
    foregroundTexture = new THREE.ImageUtils.loadTexture('sprites/background/foreground.png');

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(ScreenWidth, ScreenHeight);

    container = document.getElementById('ThreeJS');
	  container.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(viewAngle, ScreenWidth/ScreenHeight, near, far);
    scene.add(camera);
    camera.position.set(-3730, 130, 100);
    camera.lookAt(-3730, 130, 100);

    backgroundMaterial = new THREE.MeshBasicMaterial( { map: backgroundTexture, side: THREE.DoubleSide, transparent: true } );
    megamanMaterial = new THREE.MeshBasicMaterial( { map: megamanTexture, side: THREE.DoubleSide, transparent: true} );
    foregroundMaterial = new THREE.MeshBasicMaterial( { map: foregroundTexture, side: THREE.DoubleSide, transparent: true } );

    backgroundPlane = new THREE.PlaneGeometry( 4693,460,1,1 );
    megamanPlane = new THREE.PlaneGeometry( 600,679 );
    foregroundPlane = new THREE.PlaneGeometry( 7680,460,1,1 );

    background = new THREE.Mesh(backgroundPlane, backgroundMaterial);
    megamanImg = new THREE.Mesh(megamanPlane, megamanMaterial);
    foreground = new THREE.Mesh(foregroundPlane, foregroundMaterial);

    background.position.set(-550,0,0);
    background.scale.set(1.5,1,1);
    megamanImg.position.set(-3730, 119, 30);
    megamanImg.scale.set(0.035,0.035,0.035);
    megaman.x = -3715;
    megaman.y = 119;
    foreground.position.set(0,0,20);

    scene.add(background);
    scene.add(megamanImg);
    scene.add(foreground);

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

  if ( keyboard.pressed("A") ){
    if(esquerda == false){
      esquerda = true;
      megamanImg.scale.x *= -1;
    }

    if(camera.position.x > -3730 && megamanImg.position.x <= camera.position.x)
      camera.translateX( -moveDistance );
    if(megamanImg.position.x > -3775)
      megamanImg.translateX( -moveDistance );
  }

  if ( keyboard.pressed("D") ){
    if(esquerda == true){
      esquerda = false;
      megamanImg.scale.x *= -1;
    }

    if( !(megamanImg.position.x < camera.position.x) )
      camera.translateX(  moveDistance );
    megamanImg.translateX( moveDistance );
  }
}

function TileTextureAnimator(texture, hTiles, vTiles, durationTile)
{
  this.currentTile = 0;
  this.durationTile = durationTile;
  this.currentTime = 0;
  this.hTiles = hTiles;
  this.vTiles = vTiles;
  this.cntTiles = this.hTiles * this.vTiles;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  texture.repeat.set(1 / this.hTiles, 1 / this.vTiles);

  this.update = function(time) {
    this.currentTime += time;

    while (this.currentTime > this.durationTile) {
      this.currentTime -= this.durationTile;
      this.currentTile++;

      if (this.currentTile == this.cntTiles) {
        this.currentTile = 0;
      }

      var iColumn = this.currentTile % this.hTiles;
      texture.offset.x = iColumn / this.hTiles;
      var iRow = Math.floor(this.currentTile / this.hTiles);
      texture.offset.y = iRow / this.vTiles;
    }
  };
}
