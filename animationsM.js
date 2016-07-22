var TIROSPD = 5;//velocidade de movimento de projétil
//-------------------OBJETOS GLOBAIS DE ANIMAÇÃO----------------------
var megaman = {x: 0, y: 0, z: 0, hp: 16};//controle do personagem
var megamanPlane;//geometria do personagem
//objetos finais animados
var standMegaman, walkMegaman, jumpMegaman, dashMegaman, pewpewMegaman, pewRunMegaman;
//objetos intermediários de textura
var standMegamanTexture, walkMegamanTexture, jumpMegamanTexture, dashMegamanTexture, pewpewMegamanTexture, shotTexture, shotPoppingTexture, pewRunMegamanTexture;
//objetos intermediários de material
var standMegamanMaterial, walkMegamanMaterial, jumpMegamanMaterial, dashMegamanMaterial, pewpewMegamanMaterial, shotMaterial, shotPoppingMaterial, pewRunMegamanMaterial;
//objetos intermediários de animação de textura
var standMegamanAnim, walkMegamanAnim, jumpMegamanAnim, dashMegamanAnim, pewpewMegamanAnim, shotAnim, shotPoppingAnim, pewRunMegamanAnim;

var standMisseler, attackingMisseler, flyingBee;
var standMisselerTexture, attackingMisselerTexture, flyingBeeTexture;
var standMisselerMaterial, attackingMisselerMaterial, flyingBeeMaterial;
var standMisselerAnim, attackingMisselerAnim, flyingBeeAnim;
var misselerPlane,attMisselerPlane, flyingBeePlane;
//-------------------OBJETOS GLOBAIS DE ANIMAÇÃO----------------------

var curvaBezier, pontosCurva, iteracao;

//-------------------OBJETOS GLOBAIS DE CONTROLE DE ANIMAÇÃO----------------------
var shooting = false;
var running = false;
var animEsquerda = false;
var shootEsquerda = false;
var standEsquerda = false;
var shootRunEsquerda = false;
var walkEsquerda = false;
var standingClock = 3, runningClock = 5;//temporizadores de atualização p/ 'parado' e 'correndo'
//-------------------OBJETOS GLOBAIS DE CONTROLE DE ANIMAÇÃO----------------------

function initAnim(x, y, z)//FUNÇÃO DE CONTROLE DE ANIMAÇÃO
{
		//------------------------CONTROLE DE TEXTURA-------------------------------
		standMegamanTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/standingmmx.png');//text. 'parado'
    standMegamanTexture.minFilter = THREE.LinearFilter;//impede redimensionamento automático de imagem.
    walkMegamanTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/walkingmmx.png');//text. 'andando'
    walkMegamanTexture.minFilter = THREE.LinearFilter;//impede redimensionamento automático de imagem.
		pewpewMegamanTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/shootingmmx.png');//text. 'atirando'
    pewpewMegamanTexture.minFilter = THREE.LinearFilter;//impede redimensionamento automático de imagem.
		shotTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/shot1.png');//text. do projétil
		shotTexture.minFilter = THREE.LinearFilter;//impede redimensionamento automático de imagem.
		shotPoppingTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/shot_pop.png');//text. de colisão projétil
		shotPoppingTexture.minFilter = THREE.LinearFilter;//impede redimensionamento automático de imagem.
		pewRunMegamanTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/prMmx.png');//text. 'atirando e correndo'
		pewRunMegamanTexture.minFilter = THREE.LinearFilter;//impede redimensionamento automático de imagem.

		standMisselerTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/misseler.png');
		standMisselerTexture.minFilter = THREE.LinearFilter;
		attackingMisselerTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/firesseler.png');
		attackingMisselerTexture.minFilter = THREE.LinearFilter;

		flyingBeeTexture = new THREE.ImageUtils.loadTexture('sprites/mmx/flyingbee.png');
		flyingBeeTexture.minFilter = THREE.LinearFilter;
		//------------------------CONTROLE DE TEXTURA-------------------------------

		//-------------------CONTROLE DE ANIMAÇÃO DE TEXTURA-------------------------
		/*o objeto contém as "fatias" de texturas sequenciadas numa animação
		params= textura à fatiar, fatias na hor., fatias na ver., total de fatias,
		temp de atualização*/
		standMegamanAnim = new TextureAnimator(standMegamanTexture, 1, 3, 3, 30);//'parado'
    walkMegamanAnim = new TextureAnimator(walkMegamanTexture, 1, 11, 11, 30);//'andando'
		//novas animações
		pewpewMegamanAnim = new TextureAnimator(pewpewMegamanTexture, 1, 1, 1, 30);//'atirando'
		shotAnim = new TextureAnimator(shotTexture, 1, 1, 1, 30);//'projétil'
		shotPoppingAnim = new TextureAnimator(shotPoppingTexture, 1, 3, 3, 30);//'colisão de projétil'
		pewRunMegamanAnim = new TextureAnimator(pewRunMegamanTexture, 1, 11, 11, 30);//'atirando e correndo'
		standMisselerAnim = new TextureAnimator(standMisselerTexture, 1, 2, 2, 30);
		attackingMisselerAnim = new TextureAnimator(attackingMisselerTexture, 1, 10, 10, 30);
		flyingBeeAnim = new TextureAnimator(flyingBeeTexture, 1, 6, 6, 30);
		//-------------------CONTROLE DE ANIMAÇÃO DE TEXTURA------------------------

		//-------------------MATERIAL DE ANIMAÇÃO DE TEXTURA------------------------
    /*Criação do material(como reage a luz, etc.) que será aplicado à geometria.
		Nesse material,a textura é adicionada. No caso, as sprites carregadas
		anteriormente*/
		//VERIFICAR O MATERIAL USADO PARA REAGIR COM A LUZ!
    standMegamanMaterial = new THREE.MeshBasicMaterial({ //megaman 'parado'
			 map: standMegamanTexture, side: THREE.DoubleSide, transparent: true} );
    walkMegamanMaterial = new THREE.MeshBasicMaterial({ //megaman 'andando'
			map: walkMegamanTexture, side: THREE.DoubleSide, transparent: true} );
		pewpewMegamanMaterial = new THREE.MeshBasicMaterial({ //megaman 'atirando'
			map: pewpewMegamanTexture, side: THREE.DoubleSide, transparent: true} );
		shotMaterial = new THREE.MeshBasicMaterial({ //projétil
			map: shotTexture, side: THREE.DoubleSide, transparent: true} );
		shotPoppingMaterial = new THREE.MeshBasicMaterial({ //colisão do projétil
			map: shotPoppingTexture, side: THREE.DoubleSide, transparent: true} );
		pewRunMegamanMaterial = new THREE.MeshBasicMaterial({ //megaman 'atirando e correndo'
			map: pewRunMegamanTexture, side: THREE.DoubleSide, transparent: true} );
		standMisselerMaterial = new THREE.MeshBasicMaterial({
			map: standMisselerTexture, side: THREE.DoubleSide, transparent: true} );
		attackingMisselerMaterial = new THREE.MeshBasicMaterial({
			map: attackingMisselerTexture, side: THREE.DoubleSide, transparent: true} );
		flyingBeeMaterial = new THREE.MeshBasicMaterial({
			map: flyingBeeTexture, side: THREE.DoubleSide, transparent: true} );
		//-------------------MATERIAL DE ANIMAÇÃO DE TEXTURA------------------------

    //-------------------GEOMETRIA DA ANIMAÇÃO---------------------------
    megamanPlane = new THREE.PlaneGeometry( 39, 35 );
		shotPlane = new THREE.PlaneGeometry( 18, 15 );
		misselerPlane = new THREE.PlaneGeometry( 48, 58 );
		attMisselerPlane = new THREE.PlaneGeometry( 52, 62 );
		flyingBeePlane = new THREE.PlaneGeometry( 31, 32 );
		//-------------------GEOMETRIA DA ANIMAÇÃO---------------------------

    //-------------------FUSÃO DE ANIMAÇÃO DE TEXTURA---------------------------
		/*Combina-se a geometria desejada com a o material (como reage a luz e etc,
		juntamente com a textura carregada) que deve ser aplicado*/
		standMegaman = new THREE.Mesh(megamanPlane, standMegamanMaterial);
    walkMegaman = new THREE.Mesh(megamanPlane, walkMegamanMaterial);
		pewpewMegaman = new THREE.Mesh(megamanPlane, pewpewMegamanMaterial);
		pewRunMegaman = new THREE.Mesh(megamanPlane, pewRunMegamanMaterial);
		standMisseler = new THREE.Mesh(misselerPlane, standMisselerMaterial);
		attackingMisseler = new THREE.Mesh(attMisselerPlane, attackingMisselerMaterial);
		flyingBee = new THREE.Mesh(flyingBeePlane, flyingBeeMaterial);
		//VERIFICAR se faltou mesh do tiro
		//-------------------FUSÃO DE ANIMAÇÃO DE TEXTURA---------------------------

		//-------------------ESCALA DE TAMANHO DE ANIMAÇÃO--------------------------
    standMegaman.scale.set(0.6,0.6,0.6);
    walkMegaman.scale.set(0.6,0.6,0.6);
		pewpewMegaman.scale.set(0.6,0.6,0.6);
		pewRunMegaman.scale.set(0.6,0.6,0.6);
		standMisseler.scale.set(0.6,0.6,0.6);
		attackingMisseler.scale.set(0.6,0.6,0.6);
		flyingBee.scale.set(0.6,0.6,0.6);
		//shotPopping.scale.set(0.035,0.035,0.035);
		//-------------------ESCALA DE TAMANHO DE ANIMAÇÃO--------------------------

		//-------------------ATUALIZAÇÃO P/ OBJETOS INTERNOS------------------------
		animationPic = standMegaman;//Animação completa (com geometria)
    animation = standMegamanAnim;//Animação de textura
    updateClock = standingClock;//Temporizador de atualização
		//-------------------ATUALIZAÇÃO P/ OBJETOS INTERNOS------------------------

		//-------------------CAPTURA PARÂMETROS --------------------------
    megaman.x = x; //inicializa os atributos do obj megaman
    megaman.y = y;
    megaman.z = z;
		//posiciona a nossa animação onde o megaman deve estar
    animationPic.position.set(megaman.x, megaman.y, megaman.z);
		//-------------------CAPTURA PARÂMETROS --------------------------
}

function changeAnim(novaAnim, novaImg, clockzin){//FUNÇÃO de troca de animação
		//params = textura animada, obj final de animação, temporizador de animação
		//-------------------MANTÉM COORDENADAS DE ANIMAÇÃO-------------------------
    megaman.x = animationPic.position.x;
    megaman.y = animationPic.position.y;
    megaman.z = animationPic.position.z;
		//-------------------MANTÉM COORDENADAS DE ANIMAÇÃO-------------------------

		//-------------------CONTROLE DE CENA--------------------------
		scene.remove(animationPic); //Remove da cena o objeto animado antigo
			//-----------------ATUALIZAÇÃO P/ OBJETOS INTERNOS----------------------
		animation = novaAnim; //nova textura animada
    animationPic = novaImg; //novo objeto final animado
    updateClock = clockzin; //novo temporizador
		//VERIFICAR necessidade do temporizador nessa fç
			//-----------------ATUALIZAÇÃO P/ OBJETOS INTERNOS----------------------
		//Posiciona o novo objeto final na posição do objeto final antigo
		animationPic.position.set(megaman.x,megaman.y,megaman.z);
    scene.add(animationPic);// Adiciona na cena
		//-------------------CONTROLE DE CENA--------------------------
}

function changeSide(){ //FUNÇÃO de controle de espelhamento da animação
  	animationPic.scale.x *= -1;
}

function animaMob(){
	var i;
	for(i = 0; i < mobs.length; i++){
		changeSide();
    mobs[i].anima.update(updateClock);

		if(mobs[i].sprite == flyingBee){
			if(iteracao < 10){
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

	if(value == 1){ //Spawna Misseler
		for(i = 0; i < mobs.length; i++){
			if(mobs[i] == standMisseler){
				auxiliar = true;
			}
		}

		if(auxiliar != true
			var misseler = {x: position, y: megaman.y+5, z: megaman.z - 5, hp: 7, sprite: standMisseler, anima: standMisselerAnim, clock: 0};
			misseler.sprite.position.set(misseler.x, misseler.y, misseler.z);
			mobs.push(misseler);
			scene.add(misseler.sprite);
		}
	}else if(value == 2){ //Spawna Flying bee
		for(i = 0; i < mobs.length; i++){
			if(mobs[i] == flyingBee){
				auxiliarBee++;
			}
		}

		if(auxiliarBee < 2){
			var flyingB = {x: position, y: megaman.y+5, z: megaman.z - 5, hp: 2, sprite: flyingBee, anima: flyingBeeAnim};
			flyingB.sprite.position.set(flyingB.x, flyingB.y, flyingB.z);
			mobs.push(flyingB);
			scene.add(flyingB.sprite);
		}

		curvaBezier = new THREE.QuadraticBezierCurve3(
		new THREE.Vector3( position, megaman.y+50, megaman.z - 5),
		new THREE.Vector3( THREE.Math.randFloat(megaman.x,position-10), megaman.y+20, megaman.z - 5 ),
		new THREE.Vector3( megaman.x, megaman.y, megaman.z - 5 ));

		pontosCurva = new THREE.Geometry();
		pontosCurva.vertices = curvaBezier.getPoints(10);
		iteracao = 0;
	}
}

function collisionCheck(){

}

function gameOver(){

}

function shotSpawn(){ //FUNÇÃO para inserção de projéteis na cena
	//------------------CONTROLE DE OBJETO DE PROJÉTIL--------------------------
	var shot = new THREE.Mesh(shotPlane, shotMaterial);//fusão de geometria + material
	shot.scale.set(0.6,0.6,0.6);//escala do tamanho do objeto final de animação
	//------------------CONTROLE DE OBJETO DE PROJÉTIL--------------------------

	//------------------CONTROLE DE POSIÇÃO DE PROJÉTIL--------------------------
	/*Esta rotina leva em consideração que lado o megaman está apontando,
	 para saber em que lado o tiro deverá aparecer.
	 O projétil tem uma distância mínima do centro do objeto do Megaman*/
	if(animEsquerda == true){//megaman apontado p/ esquerda
			shot.position.set(megaman.x - 12, megaman.y+0.85, megaman.z);
	}
	else{//megaman apontado p/ direita
			shot.position.set(megaman.x + 12, megaman.y+0.85, megaman.z);
	}
	//------------------CONTROLE DE OBJETO DE PROJÉTIL--------------------------
	//------------------CONTROLE DE OBJETO DE CENA--------------------------
	//adiciona um projétil novo no objeto de controle de projéteis ativos na cena
	shots.push(shot);
	scene.add(shot);//adiciona o projétil novo na cena
	//------------------CONTROLE DE OBJETO DE CENA--------------------------
}

function animaShots(){ //FUNÇÃO de animação de projétil	(movimentação)
	/*Percorre-se o objeto de projéteis ativos de trás pra frente,
	 para poder mover/remover tiro mais antigo na tela primeiro (o que foi 'atirado antes')*/
	//laço decrementativo do tiro mais 'velho' ao mais 'novo'
	for(var i = shots.length-1; i>=0; i--){
		//------------------OBJETOS DE CONTROLE--------------------------
		var shotTemp = shots[i];//objeto aponta para o projétil atual do passo
		var posX = shotTemp.position.x; //objeto para guardar a posição atual do projétil
		//------------------OBJETOS DE CONTROLE--------------------------
		//------------------COLISÃO DE PROJÉTIL--------------------------
		//colisão com a parece esquerda
		if (posX < -3780){//colisão com a parece esquerda (está em x = -3780)
			/*remove do vetor de objeto de projétil o qual colidiu com a parede
			VERIFICAR colisão com outros objetos e ao sair da visão câmera*/
			//'splice' remove um obj do índice desejado
			shots.splice(i,1);//params.=posição, numero de elementos a remover
			scene.remove(shotTemp);//retira o projétil da cena
		}
		//------------------COLISÃO DE PROJÉTIL--------------------------
		else {//O projétil que não colide permanece em movimento
			//----------------CONTROLE DE DIREÇÃO DO MOVIMENTO------------------------
			/*Quando a posição X do tiro é menor que a do objeto final do Megaman,
			obrigatoriamente o projétil está à esquerda do Megaman. */
			if (posX < animationPic.position.x){
				//movimento de espaço 'TIROSPD' para a esquerda
				shotTemp.translateX( -TIROSPD)
			}
			/*Inversamente, quando a posição X do tiro é MAIOR que a do objeto final
			do Megaman, obrigatoriamente o projétil está à direta do Megaman. */
			else {
				//movimento de espaço 'TIROSPD' para a direita
				shotTemp.translateX(TIROSPD)
			}
			//----------------CONTROLE DE DIREÇÃO DO MOVIMENTO------------------------
		}

	}
}

/*FUNÇÃO padrão de animação de textura
Extraída de: https://stemkoski.github.io/Three.js/Texture-Animation.html*/
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
