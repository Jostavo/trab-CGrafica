var TIROSPD = 5;

var megaman = {x: 0, y: 0, z: 0, hp: 16};
var megamanPlane;
var standMegaman, walkMegaman, jumpMegaman, dashMegaman, pewpewMegaman, pewRunMegaman;
var standMegamanTexture, walkMegamanTexture, jumpMegamanTexture, dashMegamanTexture, pewpewMegamanTexture, shotTexture, shotPoppingTexture, pewRunMegamanTexture;
var standMegamanMaterial, walkMegamanMaterial, jumpMegamanMaterial, dashMegamanMaterial, pewpewMegamanMaterial, shotMaterial, shotPoppingMaterial, pewRunMegamanMaterial;
var standMegamanAnim, walkMegamanAnim, jumpMegamanAnim, dashMegamanAnim, pewpewMegamanAnim, shotAnim, shotPoppingAnim, pewRunMegamanAnim;

var animEsquerda = false;
var standingClock = 3, runningClock = 5;

function initAnim(x, y, z)
{
    // Esse código impede que o threeJS redimensione as imagens, bugando o animator
		standMegamanTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/standingmmx.png');
    standMegamanTexture.minFilter = THREE.LinearFilter;
    walkMegamanTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/walkingmmx.png');
    walkMegamanTexture.minFilter = THREE.LinearFilter;
		//megaman atirando
		pewpewMegamanTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/shootingmmx.png');
    pewpewMegamanTexture.minFilter = THREE.LinearFilter;
		//tiro & tiro explodindo
		shotTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/shot1.png');
		shotTexture.minFilter = THREE.LinearFilter;
		shotPoppingTexture = THREE.ImageUtils.loadTexture('sprites/mmx/shot_pop.png');
		shotPoppingTexture.minFilter = THREE.LinearFilter;

    // Aqui a gente cria os animators pra cada parte do programa
    standMegamanAnim = new TextureAnimator(standMegamanTexture, 1, 3, 3, 30);
    walkMegamanAnim = new TextureAnimator(walkMegamanTexture, 1, 11, 11, 30);
		//novas animações
		pewpewMegamanAnim = new TextureAnimator(pewpewMegamanTexture, 1, 1, 1, 30);
		shotAnim = new TextureAnimator(shotTexture, 1, 1, 1, 30);
		shotPoppingAnim = new TextureAnimator(shotPoppingTexture, 1, 3, 3, 30);

    // Aqui cria-se os Meshes
    standMegamanMaterial = new THREE.MeshBasicMaterial( { map: standMegamanTexture, side: THREE.DoubleSide, transparent: true} );
    walkMegamanMaterial = new THREE.MeshBasicMaterial( { map: walkMegamanTexture, side: THREE.DoubleSide, transparent: true} );
		//novos Meshes
		pewpewMegamanMaterial = new THREE.MeshBasicMaterial( { map: pewpewMegamanTexture, side: THREE.DoubleSide, transparent: true} );
		shotMaterial = new THREE.MeshBasicMaterial( { map: shotTexture, side: THREE.DoubleSide, transparent: true} );
		shotPoppingMaterial = new THREE.MeshBasicMaterial( { map: shotPoppingMaterial, side: THREE.DoubleSide, transparent: true} );


    // E o plano
    megamanPlane = new THREE.PlaneGeometry( 600,679 );
		shotPlane = new THREE.PlaneGeometry(300,270);

    // Aqui mescla-se os planos com os materiais
    standMegaman = new THREE.Mesh(megamanPlane, standMegamanMaterial);
    walkMegaman = new THREE.Mesh(megamanPlane, walkMegamanMaterial);
		pewpewMegaman = new THREE.Mesh(megamanPlane, pewpewMegamanMaterial);


    // Aqui inicializa-se as variáveis
    standMegaman.scale.set(0.035,0.035,0.035);
    walkMegaman.scale.set(0.035,0.035,0.035);
		pewpewMegaman.scale.set(0.035,0.035,0.035);
		//shotPopping.scale.set(0.035,0.035,0.035);

		animationPic = standMegaman;
    animation = standMegamanAnim;
    updateClock = standingClock;
    megaman.x = x;
    megaman.y = y;
    megaman.z = z;
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

//apenas usada para mostrar o megaman para o lado direito
function changeAnim2(novaAnim, novaImg, clockzin)
{
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

function shotSpawn()
{
	var shot = new THREE.Mesh(shotPlane, shotMaterial);
	shot.scale.set(0.035,0.035,0.035);
	if(animEsquerda == true){
			shot.position.set(megaman.x - 15, megaman.y+1.6, megaman.z);
	}
	else{
			shot.position.set(megaman.x + 15, megaman.y+1.6, megaman.z)
	}
	//multiplos tiros
	shots.push(shot);
	scene.add(shot);
}

//itera de trás pra frente, pra poder remover tiro mais antigo
function animaShots()
{
	for(var i = shots.length-1; i>=0; i--)
	{
		var shotTemp = shots[i];
		var posX = shotTemp.position.x;

		//colisão com a parece esquerda
		if (posX < -3780){
			//remove do vetor o projetil que colidiu
			//inserir anim de shot pop
			shots.splice(i,1);//posição, numero de elementos a remover
			scene.remove(shotTemp);
		}
		else {//se nao colidiu, anima
			if (posX < animationPic.position.x) {//tiro a esquerda
				shotTemp.translateX( -TIROSPD)
			}
			else {
				shotTemp.translateX(TIROSPD)
			}
		}

	}
}

// Função de animação
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
