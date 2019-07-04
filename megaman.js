class Megaman{
  constructor(){
    this.position = createVector(0,0);
    this.standing_image = loadImage("/sprites/characters/x/standingmmx.png");
    this.shooting_image = loadImage("/sprites/characters/x/shootingmmx.png");
    this.running_image = loadImage("/sprites/characters/x/runningmmx.png");
    this.sr_image = loadImage("/sprites/characters/x/srmmx.png");
    this.hitpoints = 16;
  }

  show(){
    this.standing_image.resize(80,0);
    image(this.standing_image, this.position.x, this.position.y);
  }

  update(){

  }

  chooseAnimation(){

  }

  spawnShot(){

  }

  left(){

  }

  right(){
    
  }
}


// function changeAnim(novaAnim, novaImg, clockzin){
    
    
//     megaman.x = animationPic.position.x;
//     megaman.y = animationPic.position.y;
//     megaman.z = animationPic.position.z;
    

    
//     scene.remove(animationPic); 
      
//     animation = novaAnim; 
//     animationPic = novaImg; 
//     updateClock = clockzin; 
    
      
    
//     animationPic.position.set(megaman.x,megaman.y,megaman.z);
//     scene.add(animationPic);
    
// }

// function changeSide(){ 
//     animationPic.scale.x *= -1;
// }

// // Bezier curve
// function animaMob(){
//   var i;

//   for(i = 0; i < mobs.length; i++){
//     mobs[i].anima.update(updateClock);

//     if(mobs[i].sprite == flyingBee){
//       if(iteracao < 50000){
//         mobs[i].x = pontosCurva.vertices[iteracao].x;
//         mobs[i].y = pontosCurva.vertices[iteracao].y;
//         mobs[i].z = pontosCurva.vertices[iteracao].z;
//         mobs[i].sprite.position.set(mobs[i].x, mobs[i].y, mobs[i].z);
//         iteracao++;
//       }
//     }
//   }
// }

// function shotSpawn(){ 
//   var shot = new THREE.Mesh(shotPlane, shotMaterial);
//   shot.scale.set(0.6,0.6,0.6);
  

  
//   /*Esta rotina leva em consideração que lado o megaman está apontando,
//    para saber em que lado o tiro deverá aparecer.
//    O projétil tem uma distância mínima do centro do objeto do Megaman*/
//   if(animEsquerda == true){
//       shot.position.set(megaman.x - 12, megaman.y+0.85, megaman.z);
//   }
//   else{
//       shot.position.set(megaman.x + 12, megaman.y+0.85, megaman.z);
//   }
  
  
  
//   shots.push(shot);
//   scene.add(shot);
  
// }

// function animaShots(){ 
//   /*Percorre-se o objeto de projéteis ativos de trás pra frente,
//    para poder mover/remover tiro mais antigo na tela primeiro (o que foi 'atirado antes')*/
  
//   for(var i = shots.length-1; i>=0; i--){
    
//     var shotTemp = shots[i];
//     var posX = shotTemp.position.x; 
    
    
    
//     if (posX < -3780){
//       remove do vetor de objeto de projétil o qual colidiu com a parede
//       VERIFICAR colisão com outros objetos e ao sair da visão câmera
      
//       shots.splice(i,1);
//       scene.remove(shotTemp);
//     }
    
//     else {
      
//       /*Quando a posição X do tiro é menor que a do objeto final do Megaman,
//       obrigatoriamente o projétil está à esquerda do Megaman. */
//       if (posX < animationPic.position.x){
        
//         shotTemp.translateX( -TIROSPD)
//       }
//       /*Inversamente, quando a posição X do tiro é MAIOR que a do objeto final
//       do Megaman, obrigatoriamente o projétil está à direta do Megaman. */
//       else {
        
//         shotTemp.translateX(TIROSPD)
//       }
      
//     }

//   }
// }
