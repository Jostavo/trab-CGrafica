var scene, camera, renderer, keyboard;

var updateClock;

var clock = new THREE.Clock();
keyboard = new KeyboardState();

// daqui pra cima é o main

var mobs = [];
var mobShot = [];
var shots = [];

var animation, animationPic;

var standMisselerClock;
var attackingMisselerClock;

var background, foreground;
var backgroundTexture, foregroundTexture;
var backgroundPlane, foregroundPlane;
var backgroundMaterial, foregroundMaterial;

init();
animate();

function init() {
  var ScreenWidth = 800, ScreenHeight = 600;
  var viewAngle = 90;
  var near = 0.1;
  var far = 2000;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(ScreenWidth, ScreenHeight);

  container = document.getElementById('ThreeJS');
  container.appendChild( renderer.domElement );

  scene = new THREE.Scene(); 
  
  camera = new THREE.PerspectiveCamera(viewAngle, ScreenWidth/ScreenHeight, near, far);
  scene.add(camera);
  camera.position.set(-3730, 130, 100);
  camera.lookAt(-3730, 130, 100);

  // backgroundTexture = current_stage.backgroundTexture
  // foregroundTexture = current_stage.foregroundTexture

  backgroundTexture = new THREE.ImageUtils.loadTexture('sprites/stages/intro_stage/novobg.png'); //padronizar
  foregroundTexture = new THREE.ImageUtils.loadTexture('sprites/stages/intro_stage/foreground.png'); //padronizar
  
  backgroundMaterial = new THREE.MeshBasicMaterial(
    { map: backgroundTexture, side: THREE.DoubleSide, transparent: true }  );
  foregroundMaterial = new THREE.MeshBasicMaterial(
    { map: foregroundTexture,transparent: true } );
  
  backgroundPlane = new THREE.PlaneGeometry( 4693,460,1, 1 );
  foregroundPlane = new THREE.PlaneGeometry( 7680,460,1,1 );
  
  background = new THREE.Mesh(backgroundPlane, backgroundMaterial);
  foreground = new THREE.Mesh(foregroundPlane, foregroundMaterial);
  
  background.position.set(-550,0,0);
  background.scale.set(1.5,1,1);
  foreground.position.set(0,0,20);
  
  initAnim(-3730, 119, 30);
  
  scene.add(background);
  scene.add(foreground);
  scene.add(animationPic);
  
  renderer.setClearColor( new THREE.Color(0xffffff), 1);
  
  renderer.render(scene, camera);
}

function animate()
{
    requestAnimationFrame(animate);
	  renderer.render(scene, camera);
	  update();
}

function update()
{
  var auxiliar;
  var delta = clock.getDelta(); 
  var moveDistance = 70 * delta; 

  keyboard.update(); 
  animation.update(updateClock); 
  
  animaShots(); 
  animaMob();

  megaman.x = animationPic.position.x;
  megaman.y = animationPic.position.y;
  megaman.z = animationPic.position.z;
  
  if ( keyboard.down("A") || keyboard.pressed("A") ){
    running = true;
    animEsquerda = true;
    
    if(shooting == true){
      changeAnim(pewRunMegamanAnim, pewRunMegaman, runningClock);
      if(shootRunEsquerda != true){
        changeSide();
        shootRunEsquerda = true;
      }
    }else{
      changeAnim(walkMegamanAnim, walkMegaman, runningClock);
      if(walkEsquerda != true){
        changeSide();
        walkEsquerda = true;
      }
    }
    
    if(camera.position.x > -3730 && animationPic.position.x <= camera.position.x)
      camera.translateX( -moveDistance );
    
    if(animationPic.position.x > -3775)
      animationPic.translateX( -moveDistance );
  }
  
  if ( keyboard.down("D") || keyboard.pressed("D") ){
    running = true;
    animEsquerda = false;
    
    if(shooting == true){
      changeAnim(pewRunMegamanAnim, pewRunMegaman, runningClock);
      if(shootRunEsquerda != false){
        changeSide();
        shootRunEsquerda = false;
      }
    }else{
      changeAnim(walkMegamanAnim, walkMegaman, runningClock);
      if(walkEsquerda != false){
        changeSide();
        walkEsquerda = false;
      }
    }
    
    if( !(animationPic.position.x < camera.position.x) )
      camera.translateX( moveDistance );
    

    if(camera.position.x > -3600){
      mobSpawn(-3500, 1);
    }

    if(camera.position.x > -3400){
      mobSpawn(-3300, 2);
    }

    animationPic.translateX( moveDistance );
  }
  
  if ( keyboard.down("space")){
    
    shooting = true;

    if(running == true){
      changeAnim(pewRunMegamanAnim, pewRunMegaman, runningClock);
      if(animEsquerda != false && shootRunEsquerda != true){
        changeSide();
        shootRunEsquerda = true;
      }
    }else{
      changeAnim(pewpewMegamanAnim, pewpewMegaman, standingClock);
      if(animEsquerda != false && shootEsquerda != true){
        changeSide();
        shootEsquerda = true;
      }
    }
    
    shotSpawn();
  }

  
  
  if( keyboard.up("A") ) {
    running = false;
    animEsquerda = true;
    
    if(shooting == true){
      changeAnim(pewpewMegamanAnim, pewpewMegaman, standingClock);
      if(shootEsquerda != true){
        changeSide();
        shootEsquerda = true;
      }
    }else{
      changeAnim(standMegamanAnim, standMegaman, standingClock);
      if(standEsquerda != true){
        changeSide();
        standEsquerda = true;
      }
    }
  }else if( keyboard.up("D") ){
    running = false;
    animEsquerda = false;
    
    if(shooting == true){
      changeAnim(pewpewMegamanAnim, pewpewMegaman, standingClock);
      if(shootEsquerda != false){
        changeSide();
        shootEsquerda = false;
      }
    }else{
      changeAnim(standMegamanAnim, standMegaman, standingClock);
      if(standEsquerda != false){
        changeSide();
        standEsquerda = false;
      }
    }
  }
  
  else if(keyboard.up("space"))
  {
    shooting = false;

    if(running == true){
      changeAnim(walkMegamanAnim, walkMegaman, runningClock);
      if(animEsquerda != false && walkEsquerda != true){
        changeSide();
        walkEsquerda = true;
      }
    }else{
      changeAnim(standMegamanAnim, standMegaman, standingClock);
      if(animEsquerda != false && standEsquerda != true){
        changeSide();
        standEsquerda = true;
      }
    }
  }
  
}
