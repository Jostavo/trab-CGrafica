var mobs = [];
var shots = [];

var scene, camera, renderer, keyboard;

var animation, animationPic;
var updateClock;

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
  var far = 2000;

    // Aqui é feito o fetch de todas as imagens necessárias para o programa
    backgroundTexture = new THREE.ImageUtils.loadTexture('sprites/background/novobg.png');
    foregroundTexture = new THREE.ImageUtils.loadTexture('sprites/background/foreground.png');

    // Criação do renderer da cena
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(ScreenWidth, ScreenHeight);

    // Aqui a gente procura o div ThreeJS e encaixa o game no Web
    container = document.getElementById('ThreeJS');
	  container.appendChild( renderer.domElement );

    // É criado a Cena
    scene = new THREE.Scene();

    // Aqui a gente cria a câmera, define os parâmetros e para aonde ela vai apontar/olhar
    camera = new THREE.PerspectiveCamera(viewAngle, ScreenWidth/ScreenHeight, near, far);
    scene.add(camera);
    camera.position.set(-3730, 130, 100);
    camera.lookAt(-3730, 130, 100);

    // É criado o material para ser aplicado no Mesh (objeto)
    backgroundMaterial = new THREE.MeshBasicMaterial( { map: backgroundTexture, side: THREE.DoubleSide, transparent: true } );
    foregroundMaterial = new THREE.MeshBasicMaterial( { map: foregroundTexture, side: THREE.DoubleSide, transparent: true } );

    // São criados os planes que receberão as imagens de fundo/frente/megaman
    backgroundPlane = new THREE.PlaneGeometry( 4693,460,1,1 );
    foregroundPlane = new THREE.PlaneGeometry( 7680,460,1,1 );

    // Aqui é feito o Mesh (mistura) do plano com a imagem
    background = new THREE.Mesh(backgroundPlane, backgroundMaterial);
    foreground = new THREE.Mesh(foregroundPlane, foregroundMaterial);

    // Aqui é definida as posições das imagens, definida a animação atual, a posição inicial do megaman
    background.position.set(-550,0,0);
    background.scale.set(1.5,1,1);
    foreground.position.set(0,0,20);

    initAnim(-3730, 119, 30);

    // Os elementos são adicionados na cena
    scene.add(background);
    scene.add(foreground);
    scene.add(animationPic);

    // renderer.setClearColor( new THREE.Color(0xffffff), 1);

    // Comando pra renderizar a cena
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
  var delta = clock.getDelta(); // Clock pra contagem da animação
  var moveDistance = 50 * delta; // Distância de movimento

  keyboard.update(); // Aqui recebe as atualizações do teclado
  animation.update(updateClock); // Aqui acontecem os updates das animações

  // Salva a posição do megaman no dado momento
  megaman.x = animationPic.position.x;
  megaman.y = animationPic.position.y;
  megaman.z = animationPic.position.z;

  // De acordo com cada tecla, executa um código específico
  if ( keyboard.down("A") || keyboard.pressed("A") ){
    // Muda pra animação Walking MegaMan
    changeAnim(walkMegamanAnim, walkMegaman, runningClock);
    // Caso a textura não esteja virada para a esquerda, vira
    if(animEsquerda == false){
      changeSide();
    }

    // Verifica colisão com a parede do lado esquerdo e controla a câmera (para a câmera não passar dos limites)
    if(camera.position.x > -3730 && animationPic.position.x <= camera.position.x)
      camera.translateX( -moveDistance );
    if(animationPic.position.x > -3775)
      animationPic.translateX( -moveDistance );
  }

  if ( keyboard.down("D") || keyboard.pressed("D") ){
    // Muda a animação pra Walking MegaMan
    changeAnim(walkMegamanAnim, walkMegaman, runningClock);
    // Volta a textura caso ela esteja para a esquerda
    if(animEsquerda == true){
      changeSide();
    }

    // Verifica se o Megaman já voltou para a posição central, assim volta a mexer a câmera
    if( !(animationPic.position.x < camera.position.x) )
      camera.translateX(  moveDistance );
    animationPic.translateX( moveDistance );
  }

  //barra de espaço, megaman atirando
  if ( keyboard.down("space") || keyboard.pressed("space") ){
    // Muda a animação pra PEWPEWPEWPEW -= <> <> <> <> <> <> <> position
    if(animEsquerda == true){
      changeAnim(pewpewMegamanAnim, pewpewMegaman, standingClock);
      changeSide();
    }
    changeAnim2(pewpewMegamanAnim, pewpewMegaman, standingClock);
    // Volta a textura caso ela esteja para a esquerda

  }

  // Quando o usuário solta a tecla de andar, a animação volta para a Standing MegaMan
  if( keyboard.up("A") || keyboard.up("D")) {
    changeAnim(standMegamanAnim, standMegaman, standingClock);
    if( keyboard.up("A")){
      if(animEsquerda == false){
        changeSide();
      }
    }
  }
}
