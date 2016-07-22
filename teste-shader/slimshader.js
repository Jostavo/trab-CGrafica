// variaveis globais Note que sempre tem camera, scene e renderer
var scene, camera, renderer, controls, stats;
var clock = new THREE.Clock();
// E sempre tem Mesh
var mesh;

init();
animate(); //onde a magica acontece

//FUNÇÕES
function init()
{
  // SCENE
  scene = new THREE.Scene();

  // CAMERA
  var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
  var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0,150,400);
  camera.lookAt(scene.position);

  // RENDERER
  renderer = new THREE.WebGLRenderer( {antialias:true} );
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  var container = document.getElementById('ThreeJS');
  container.appendChild( renderer.domElement );

  // LIGHT
  var light = new THREE.DirectionalLight(0xffffff);
  var amblight = new THREE.AmbientLight(0x404040);
  light.position.set(10,250, 200);
  scene.add(light);
  scene.add(amblight);

  ////////////
  // CUSTOM //
  ////////////
  /*var tex = THREE.ImageUtils.loadTexture('texture.png');
  tex.minFilter = THREE.LinearFilter;
  var geometry = new THREE.PlaneGeometry( 50,50 );
  var material = new THREE.MeshBasicMaterial( {
    map: tex,
    side: THREE.DoubleSide,
    transparent: true
    } );
  material.li*/

  var geometry = new THREE.PlaneGeometry( 50,50 );
  var creatureImage = THREE.ImageUtils.loadTexture('texture.png');
  creatureImage.magFilter = THREE.NearestFilter;//mantem pixelado
  var material = new THREE.ShaderMaterial({//allows us to specify our custom vertex and fragment shaders.
      uniforms: THREE.UniformsUtils.merge([
          THREE.UniformsLib['lights'],
          {
              color: {type: 'f', value: 0.0},
              evilCreature: {type: 't', value: null}
          }
      ]),
      vertexShader: document.getElementById( 'vertShader' ).textContent,
      fragmentShader: document.getElementById( 'fragShader').textContent,
      transparent: true,
      lights: true
  });
  material.uniforms.evilCreature.value = creatureImage;
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.set(0,0,0);
  scene.add(mesh);

  // Create light
  var light = new THREE.PointLight(0xffffff, 1.0);
  // We want it to be very close to our character
  light.position.set(0.0,0.0,0.1);
  scene.add(light);
}

function animate()
{
  var c = 0.5+0.5*Math.cos(
          new Date().getTime()/1000.0 * Math.PI);
  mesh.material.uniforms.color.value = c;
  requestAnimationFrame( animate );
  render();
  update();
}

function update()
{
  if ( keyboard.pressed("z") )
  {
    // do something
  }

  controls.update();
  stats.update();
}

function render()
{
  renderer.render( scene, camera );
}
