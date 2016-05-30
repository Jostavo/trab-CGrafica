var megaman = {x: 0, y: 0, z: 0, hp: 16};
var megamanPlane;
var standMegaman, walkMegaman, jumpMegaman, dashMegaman;
var standMegamanTexture, walkMegamanTexture, jumpMegamanTexture, dashMegamanTexture;
var standMegamanMaterial, walkMegamanMaterial, jumpMegamanMaterial, dashMegamanMaterial;
var standMegamanAnim, walkMegamanAnim, jumpMegamanAnim, dashMegamanAnim;

var animEsquerda = false;
var standingClock = 30, runningClock = 450;

function initAnim(x, y, z)
{
    // Esse código impede que o threeJS redimensione as imagens, bugando o animator
	standMegamanTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/standingmmx.png');
    standMegamanTexture.minFilter = THREE.LinearFilter;
    walkMegamanTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/walkingmmx.png');
    walkMegamanTexture.minFilter = THREE.LinearFilter;

    // Aqui a gente cria os animators pra cada parte do programa
    standMegamanAnim = new TextureAnimator(standMegamanTexture, 1, 3, 3, 30);
    walkMegamanAnim = new TextureAnimator(walkMegamanTexture, 1, 11, 11, 30);

    // Aqui cria-se os Meshes
    standMegamanMaterial = new THREE.MeshBasicMaterial( { map: standMegamanTexture, side: THREE.DoubleSide, transparent: true} );
    walkMegamanMaterial = new THREE.MeshBasicMaterial( { map: walkMegamanTexture, side: THREE.DoubleSide, transparent: true} );

    // E o plano
    megamanPlane = new THREE.PlaneGeometry( 600,679 );

    // Aqui mescla-se os planos com os materiais
    standMegaman = new THREE.Mesh(megamanPlane, standMegamanMaterial);
    walkMegaman = new THREE.Mesh(megamanPlane, walkMegamanMaterial);

    // Aqui inicializa-se as variáveis
    standMegaman.scale.set(0.035,0.035,0.035);
    walkMegaman.scale.set(0.035,0.035,0.035);
    animationPic = standMegaman;
    animation = standMegamanAnim;
    updateClock = standingClock;
    megaman.x = this.x;
    megaman.y = this.y;
    megaman.z = this.z;
    animationPic.position.set(megaman.x, megaman.y, megaman.z);
}

// Função que recebe como parâmetro a nova animação
function changeAnim(novaAnim, novaImg, clockzin)
{
    // Caso esteja para a esquerda, volta a animação ao normal antes de salvar
    if(animEsquerda == true){
      animationPic.scale.x *= -1;
      animEsquerda = false;
    }

    // Salva as coordenadas
    megaman.x = animationPic.position.x;
    megaman.y = animationPic.position.y;
    megaman.z = animationPic.position.z;
    // Remove da cena
    scene.remove(animationPic);

    // Muda a animação que irá aparecer
    animation = novaAnim;
    animationPic = novaImg;
    updateClock = clockzin;

    // Seta na nova animação a localização da antiga
    animationPic.position.set(megaman.x,megaman.y,megaman.z);
    // Adiciona na cena
    scene.add(animationPic);
}

// Função que vira a animação
function changeSide()
{
	if(animEsquerda == true){
		animEsquerda = false;
      	animationPic.scale.x *= -1;
	}else{
		animEsquerda = true;
      	animationPic.scale.x *= -1;
	}
}

// Função de animação
function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)
{
	// note: texture passed by reference, will be updated by the update function.

	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet.
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	this.currentDisplayTime = 0;

	// which image is currently being displayed?
	this.currentTile = 0;

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