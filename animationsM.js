var TIROSPD = 5;

var megaman = {x: 0, y: 0, z: 0, hp: 16};
var megamanPlane;

var standMegaman, walkMegaman, jumpMegaman, dashMegaman, pewpewMegaman, pewRunMegaman;

var standMegamanTexture, walkMegamanTexture, jumpMegamanTexture, dashMegamanTexture, pewpewMegamanTexture, shotTexture, shotPoppingTexture, pewRunMegamanTexture;

var standMegamanMaterial, walkMegamanMaterial, jumpMegamanMaterial, dashMegamanMaterial, pewpewMegamanMaterial, shotMaterial, shotPoppingMaterial, pewRunMegamanMaterial;

var standMegamanAnim, walkMegamanAnim, jumpMegamanAnim, dashMegamanAnim, pewpewMegamanAnim, shotAnim, shotPoppingAnim, pewRunMegamanAnim;

var standMisseler, attackingMisseler, flyingBee;
var standMisselerTexture, attackingMisselerTexture, flyingBeeTexture;
var standMisselerMaterial, attackingMisselerMaterial, flyingBeeMaterial;
var standMisselerAnim, attackingMisselerAnim, flyingBeeAnim;
var misselerPlane,attMisselerPlane, flyingBeePlane;


var curvaBezier, pontosCurva, iteracao;


var shooting = false;
var running = false;
var animEsquerda = false;
var shootEsquerda = false;
var standEsquerda = false;
var shootRunEsquerda = false;
var walkEsquerda = false;
var standingClock = 3, runningClock = 5;


function initAnim(x, y, z)
{
    
    standMegamanTexture = new THREE.ImageUtils.loadTexture('sprites/characters/x/standingmmx.png');
    standMegamanTexture.minFilter = THREE.LinearFilter;
    walkMegamanTexture = new THREE.ImageUtils.loadTexture('sprites/characters/x/walkingmmx.png');
    walkMegamanTexture.minFilter = THREE.LinearFilter;
    pewpewMegamanTexture = new THREE.ImageUtils.loadTexture('sprites/characters/x/shootingmmx.png');
    pewpewMegamanTexture.minFilter = THREE.LinearFilter;
    shotTexture = new THREE.ImageUtils.loadTexture('sprites/effects/shots/shot1.png');
    shotTexture.minFilter = THREE.LinearFilter;
    shotPoppingTexture = new THREE.ImageUtils.loadTexture('sprites/effects/shots/shot_pop.png');
    shotPoppingTexture.minFilter = THREE.LinearFilter;
    pewRunMegamanTexture = new THREE.ImageUtils.loadTexture('sprites/characters/x/prMmx.png');
    pewRunMegamanTexture.minFilter = THREE.LinearFilter;

    standMisselerTexture = new THREE.ImageUtils.loadTexture('sprites/mobs/misseler/misseler.png');
    standMisselerTexture.minFilter = THREE.LinearFilter;
    attackingMisselerTexture = new THREE.ImageUtils.loadTexture('sprites/mobs/misseler/firesseler.png');
    attackingMisselerTexture.minFilter = THREE.LinearFilter;

    flyingBeeTexture = new THREE.ImageUtils.loadTexture('sprites/mobs/bee/flyingbee.png');
    flyingBeeTexture.minFilter = THREE.LinearFilter;
    

    
    /*o objeto contém as "fatias" de texturas sequenciadas numa animação
    params= textura à fatiar, fatias na hor., fatias na ver., total de fatias,
    temp de atualização*/
    standMegamanAnim = new TextureAnimator(standMegamanTexture, 1, 3, 3, 30);
    walkMegamanAnim = new TextureAnimator(walkMegamanTexture, 1, 11, 11, 30);
    
    pewpewMegamanAnim = new TextureAnimator(pewpewMegamanTexture, 1, 1, 1, 30);
    shotAnim = new TextureAnimator(shotTexture, 1, 1, 1, 30);
    shotPoppingAnim = new TextureAnimator(shotPoppingTexture, 1, 3, 3, 30);
    pewRunMegamanAnim = new TextureAnimator(pewRunMegamanTexture, 1, 11, 11, 30);
    standMisselerAnim = new TextureAnimator(standMisselerTexture, 1, 2, 2, 600);
    attackingMisselerAnim = new TextureAnimator(attackingMisselerTexture, 1, 10, 10, 30);
    flyingBeeAnim = new TextureAnimator(flyingBeeTexture, 1, 6, 6, 30);
    
    standMegamanMaterial = new THREE.MeshBasicMaterial({ 
    map: standMegamanTexture, side: THREE.DoubleSide, transparent: true} );
    walkMegamanMaterial = new THREE.MeshBasicMaterial({ 
    map: walkMegamanTexture, side: THREE.DoubleSide, transparent: true} );
    pewpewMegamanMaterial = new THREE.MeshBasicMaterial({ 
    map: pewpewMegamanTexture, side: THREE.DoubleSide, transparent: true} );
    shotMaterial = new THREE.MeshBasicMaterial({ 
    map: shotTexture, side: THREE.DoubleSide, transparent: true} );
    shotPoppingMaterial = new THREE.MeshBasicMaterial({ 
    map: shotPoppingTexture, side: THREE.DoubleSide, transparent: true} );
    pewRunMegamanMaterial = new THREE.MeshBasicMaterial({ 
    map: pewRunMegamanTexture, side: THREE.DoubleSide, transparent: true} );
    standMisselerMaterial = new THREE.MeshBasicMaterial({
    map: standMisselerTexture, side: THREE.DoubleSide, transparent: true} );
    attackingMisselerMaterial = new THREE.MeshBasicMaterial({
    map: attackingMisselerTexture, side: THREE.DoubleSide, transparent: true} );
    flyingBeeMaterial = new THREE.MeshBasicMaterial({
    map: flyingBeeTexture, side: THREE.DoubleSide, transparent: true} );
    

    
    megamanPlane = new THREE.PlaneGeometry( 39, 35 );
    shotPlane = new THREE.PlaneGeometry( 18, 15 );
    misselerPlane = new THREE.PlaneGeometry( 48, 58 );
    attMisselerPlane = new THREE.PlaneGeometry( 52, 62 );
    flyingBeePlane = new THREE.PlaneGeometry( 31, 32 );
    

    
    /*Combina-se a geometria desejada com a o material (como reage a luz e etc,
    juntamente com a textura carregada) que deve ser aplicado*/
    standMegaman = new THREE.Mesh(megamanPlane, standMegamanMaterial);
    walkMegaman = new THREE.Mesh(megamanPlane, walkMegamanMaterial);
    pewpewMegaman = new THREE.Mesh(megamanPlane, pewpewMegamanMaterial);
    pewRunMegaman = new THREE.Mesh(megamanPlane, pewRunMegamanMaterial);
    standMisseler = new THREE.Mesh(misselerPlane, standMisselerMaterial);
    attackingMisseler = new THREE.Mesh(attMisselerPlane, attackingMisselerMaterial);
    flyingBee = new THREE.Mesh(flyingBeePlane, flyingBeeMaterial);
    
    

    
    standMegaman.scale.set(0.6,0.6,0.6);
    walkMegaman.scale.set(0.6,0.6,0.6);
    pewpewMegaman.scale.set(0.6,0.6,0.6);
    pewRunMegaman.scale.set(0.6,0.6,0.6);
    standMisseler.scale.set(0.6,0.6,0.6);
    attackingMisseler.scale.set(0.6,0.6,0.6);
    flyingBee.scale.set(0.6,0.6,0.6);
    
    

    
    animationPic = standMegaman;
    animation = standMegamanAnim;
    updateClock = standingClock;
    

    
    megaman.x = x; 
    megaman.y = y;
    megaman.z = z;
    
    animationPic.position.set(megaman.x, megaman.y, megaman.z);
    
}

function changeAnim(novaAnim, novaImg, clockzin){
    
    
    megaman.x = animationPic.position.x;
    megaman.y = animationPic.position.y;
    megaman.z = animationPic.position.z;
    

    
    scene.remove(animationPic); 
      
    animation = novaAnim; 
    animationPic = novaImg; 
    updateClock = clockzin; 
    
      
    
    animationPic.position.set(megaman.x,megaman.y,megaman.z);
    scene.add(animationPic);
    
}

function changeSide(){ 
    animationPic.scale.x *= -1;
}

function animaMob(){
  var i;

  for(i = 0; i < mobs.length; i++){
    mobs[i].anima.update(updateClock);

    if(mobs[i].sprite == flyingBee){
      if(iteracao < 50000){
        mobs[i].x = pontosCurva.vertices[iteracao].x;
        mobs[i].y = pontosCurva.vertices[iteracao].y;
        mobs[i].z = pontosCurva.vertices[iteracao].z;
        mobs[i].sprite.position.set(mobs[i].x, mobs[i].y, mobs[i].z);
        iteracao++;
      }
    }
  }
}

function animaMissiler(){

}

function animaFlying(){

}

function mobSpawn(position, value){
  var auxiliar = false;
  var auxiliarBee = 0;
  var i;

  if(value == 1){ 
    for(i = 0; i < mobs.length; i++){
      if(mobs[i] == standMisseler){
        auxiliar = true;
      }
    }

    if(auxiliar != true){
      var misseler = {x: position, y: megaman.y+5, z: megaman.z - 5, hp: 7, sprite: standMisseler, anima: standMisselerAnim, clock: 0};
      misseler.sprite.position.set(misseler.x, misseler.y, misseler.z);
      mobs.push(misseler);
      scene.add(misseler.sprite);
    }
  }else if(value == 2){ 
    for(i = 0; i < mobs.length; i++){
      if(mobs[i] == flyingB){
        auxiliarBee++;
      }
    }

    if(auxiliarBee < 1){
      var flyingB = {x: position, y: megaman.y+5, z: megaman.z - 5, hp: 2, sprite: flyingBee, anima: flyingBeeAnim};
      flyingB.sprite.position.set(flyingB.x, flyingB.y, flyingB.z);
      mobs.push(flyingB);
      scene.add(flyingB.sprite);

      curvaBezier = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3( position, megaman.y+50, megaman.z - 5),
      new THREE.Vector3( THREE.Math.randFloat(megaman.x,position-10), megaman.y+20, megaman.z - 5 ),
      new THREE.Vector3( megaman.x, megaman.y, megaman.z - 5 ));

      pontosCurva = new THREE.Geometry();
      pontosCurva.vertices = curvaBezier.getPoints(50000);
      iteracao = 0;
    }
  }
}

function collisionCheck(){

}

function gameOver(){

}

function shotSpawn(){ 
  
  var shot = new THREE.Mesh(shotPlane, shotMaterial);
  shot.scale.set(0.6,0.6,0.6);
  

  
  /*Esta rotina leva em consideração que lado o megaman está apontando,
   para saber em que lado o tiro deverá aparecer.
   O projétil tem uma distância mínima do centro do objeto do Megaman*/
  if(animEsquerda == true){
      shot.position.set(megaman.x - 12, megaman.y+0.85, megaman.z);
  }
  else{
      shot.position.set(megaman.x + 12, megaman.y+0.85, megaman.z);
  }
  
  
  
  shots.push(shot);
  scene.add(shot);
  
}

function animaShots(){ 
  /*Percorre-se o objeto de projéteis ativos de trás pra frente,
   para poder mover/remover tiro mais antigo na tela primeiro (o que foi 'atirado antes')*/
  
  for(var i = shots.length-1; i>=0; i--){
    
    var shotTemp = shots[i];
    var posX = shotTemp.position.x; 
    
    
    
    if (posX < -3780){
      /*remove do vetor de objeto de projétil o qual colidiu com a parede
      VERIFICAR colisão com outros objetos e ao sair da visão câmera*/
      
      shots.splice(i,1);
      scene.remove(shotTemp);
    }
    
    else {
      
      /*Quando a posição X do tiro é menor que a do objeto final do Megaman,
      obrigatoriamente o projétil está à esquerda do Megaman. */
      if (posX < animationPic.position.x){
        
        shotTemp.translateX( -TIROSPD)
      }
      /*Inversamente, quando a posição X do tiro é MAIOR que a do objeto final
      do Megaman, obrigatoriamente o projétil está à direta do Megaman. */
      else {
        
        shotTemp.translateX(TIROSPD)
      }
      
    }

  }
}

/*FUNÇÃO padrão de animação de textura
Extraída de: https://stemkoski.github.io/Three.js/Texture-Animation.html */
function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)
{
  this.currentTile = 0;

  this.tileDisplayDuration = tileDispDuration;

  this.currentDisplayTime = 0;

  this.tilesHorizontal = tilesHoriz;
  this.tilesVertical = tilesVert;
  this.numberOfTiles = numTiles;

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

  this.update = function( milliSec )
  {
    this.currentDisplayTime += milliSec;

    while (this.currentDisplayTime > this.tileDisplayDuration)
    {
      this.currentDisplayTime -= this.tileDisplayDuration;
      this.currentTile++;

      if (this.currentTile == this.numberOfTiles)
        this.currentTile = 0;

      var currentColumn = this.currentTile % this.tilesHorizontal;
      texture.offset.x = currentColumn / this.tilesHorizontal;
      var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
      texture.offset.y = currentRow / this.tilesVertical;
    }
  };
}
