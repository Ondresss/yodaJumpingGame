/** @type {HTMLCanvasElement} */
window.addEventListener('load',()=>{
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = innerWidth;
CANVAS_HEIGHT = canvas.height = innerHeight;
const mainGlass = document.querySelector(".bgGlass");

class Food {
    constructor(game){
        this.game = game;
        this.xFood = Math.random() * this.game.gameWidth;
        this.yFood = Math.random() * this.game.gameHeight;
        this.scoreIMG = document.querySelector(".build");
    }
    drawFood(context,color){
        context.drawImage(this.scoreIMG,this.xFood,this.yFood,40,40);
    }
}


class DrawSurroundings {
    constructor(game){ 
        this.game = game;
        this.numberOfWalls = 6;
        this.wallY = Math.floor(Math.random() * 400 + 60);
        this.wallWidth = Math.floor(Math.random() * 200 + 100);
        this.wallX = Math.floor(Math.random() * CANVAS_WIDTH * 0.9);
        this.wallsImage = document.querySelector(".wall");
        this.groundImage = document.querySelector(".ground");
        this.scoreGet = new Score(this);
        this.bars = document.querySelector(".bars");
        this.platformX = Math.random() * (CANVAS_WIDTH * 0.9);
        this.platformY = Math.random() * (CANVAS_HEIGHT * 0.6);
        this.platformManage = [];
        this.logBack = document.querySelector(".log");
        
        
      
        
    }
    drawTerrain(context){
        context.drawImage(this.groundImage,0,this.game.gameHeight * 0.8,this.game.gameWidth,440);
   
        
    }

    drawBars(context){
        context.drawImage(this.bars, this.game.gameWidth * 0.96,0,100,this.game.gameHeight);
        
    }


    drawWalls(context,yodaSpeedX,yodaSpeedY){
     
        this.wallX++;
        
      
        if(this.wallX% 1000 == 0){
            this.wallX = 0;
            this.wallY = Math.random() * 400 + 30;
        }
        
        
    
        if((yodaSpeedY - this.wallY) > 0 && (yodaSpeedY - this.wallY) < 40 &&
            (yodaSpeedX - this.wallX) > -40 && (yodaSpeedX - this.wallX) < 180
        ){
          this.scoreGet.shield-=2;
          this.scoreGet.displayLifes();

          if(this.scoreGet.shield <= 0){
            this.scoreGet.gameOver();
            
          }
          

          
        } 

    
       
        context.drawImage(this.wallsImage,this.wallX,this.wallY,this.wallWidth,40);
   
      
    }


    drawPlatform(context){
        context.drawImage(this.logBack,this.platformX,this.platformY,200,60);
        
        
    }



}

class Game {
    constructor(context,gameWidth,gameHeight){
        this.frames = 1;
        this.bg = new layer(this);
        this.backSide = new backSide(this);
        this.context = context;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.surroundings = new DrawSurroundings(this);
        this.player = new Player(this);
        this.manageState = false;
        this.objectHolder = [];
        this.speedwallX = 1;
        this.food = new Food(this);
        this.score = new Score(this);
        this.ui = new UI(this);
        this.numberOfParticles = 4;
        this.particleHolder = [];
        this.gameAudio = document.querySelector("audio");
        this.bombsNew = new EnemyBombs(this);
        this.enemy = new Enemy(this);
        

        
    
    }
    mainGameControls(){

        //static objects
        //this.gameAudio.play();
        this.player.controls();
        this.score.displaytext();
        this.score.displayLifes();
        this.score.displayTimer();
        this.ui.buildInterFace();
  
        
      
        
    }
    update(){
        this.bg.drawLayer(this.context);
        this.bg.animateLayer();
        this.surroundings.drawTerrain(this.context);
        this.frames++;
        this.surroundings.drawBars(this.context);
        this.enemy.invokeEnemy(this.context);
        this.backSide.drawLevel(this.context);
    
        if(this.player.yodaStartHeight >= this.gameHeight * 0.69 && !this.backSide.colPole.includes("fall")){
            this.player.gravity = 0;
            this.player.drawPlayer(this.context);
        } else if(this.player.yodaStartHeight <= -1){

            this.player.gravity = 1;
            this.player.yodaStartHeight = 30;
            this.player.drawPlayer(this.context);
        } else {
            this.player.yodaStartHeight+=this.player.gravity;
            this.player.gravity += 0.26;

            this.player.drawPlayer(this.context);
        }

        if(this.player.controlKeys.includes("spaceBar")){
          this.player.yodaStartHeight -= 150;
          this.particleHolder.forEach(yodaPar => yodaPar.drawYodaParticles(this.context,this.player.yodaMovement,this.player.yodaStartHeight));
          this.player.controlKeys.pop("spaceBar");
          

        } else if(this.player.controlMechanism.right.pressed){
           
            this.player.yodaMovement+=2;
            if(this.player.powerUpMech[0].SpeedUp){
                this.player.yodaMovement+=4;
                this.particleHolder.forEach(yodaPar => yodaPar.drawYodaParticles(this.context,this.player.yodaMovement,this.player.yodaStartHeight));
                if(this.frames > 400){
                    this.player.powerUpMech[0].SpeedUp = false;
                    this.frames = 0;
                }
            } else if(this.player.powerUpMech[1].Power){
                alert("s")
            }
           
            
        } else if(this.player.controlMechanism.left.pressed){
         
            
            this.player.yodaMovement-=2;
            if(this.player.powerUpMech[0].SpeedUp){
                this.player.yodaMovement-=4;
                this.particleHolder.forEach(yodaPar => yodaPar.drawYodaParticles(this.context,this.player.yodaMovement,this.player.yodaStartHeight));
                if(this.frames > 400){
                    this.player.powerUpMech[0].SpeedUp = false;
                    this.frames = 0;
                }
            } else if(this.player.powerUpMech[1].Power){
                alert("s")
            }
       
        } else if(this.player.controlMechanism.stop.pressed){
            this.player.yodaMovement+=0;
        }

        if(this.player.yodaMovement >= this.gameWidth){
            this.player.yodaMovement = 0;
        } else if(this.player.yodaMovement <= this.gameHeight * 0.001){
            this.player.yodaMovement = 0;
        }
   
     
        
        this.objectHolder.forEach(wall => {
            wall.drawWalls(this.context,this.player.yodaMovement,this.player.yodaStartHeight);
            
        });
        
        if(this.player.yodaMovement < this.food.xFood + 40 &&
            this.player.yodaMovement + 100 > this.food.xFood &&
            this.player.yodaStartHeight < this.food.yFood + 40 &&
            this.player.yodaStartHeight + 100 > this.food.yFood    
         ) {
            this.food.xFood+=30;
         

            if(this.food.xFood>=this.gameWidth){
                 this.score.scoreCounter++;
                 this.score.displaytext();
                 this.food.xFood = Math.random() * this.gameWidth  * 0.9;
                 this.food.yFood = Math.random() * this.gameHeight * 0.7;
                localStorage.setItem('score', JSON.stringify(this.score.scoreCounter));
               
            }

         } else {
            this.food.drawFood(this.context);
         }
      


         if((this.player.yodaStartHeight + 100 - this.surroundings.platformY) > 0 && (this.player.yodaStartHeight + 100 - this.surroundings.platformY)< 10 &&
         (this.player.yodaMovement - this.surroundings.platformX) > -40 && (this.player.yodaMovement - this.surroundings.platformX) < 180){
            this.player.gravity = 0;
         }

         //
         
         if(this.surroundings.platformX > this.gameWidth){
            for(let i = 0; i < this.surroundings.platformManage.length;i++){
                this.surroundings.platformManage[i] = 0;
           }
      
            this.surroundings.platformManage.push("turnLeft");
            this.surroundings.platformY = Math.random() * (this.gameHeight * 0.73);
         } 
                                         //200 = width of log                       
         if(this.surroundings.platformX < (0  - 200)){
            for(let i = 0; i < this.surroundings.platformManage.length;i++){
                this.surroundings.platformManage[i] = 0;
           }
            this.surroundings.platformManage.push("turnRight");
            this.surroundings.platformY = Math.random() * (this.gameHeight * 0.8);
         }




         if(this.surroundings.platformManage.includes("turnLeft")){
         
            this.surroundings.platformX-=1.4;
         } else if(this.surroundings.platformManage.includes("turnRight")){
      
            this.surroundings.platformX+=1.4;

         } else {
       
            this.surroundings.platformX+=1.4;
         }

         //


         if(this.frames % 100 == 0){
            this.score.timer--;
            this.score.displayTimer();
         }

         this.surroundings.drawPlatform(this.context);
         this.bombsNew.invokeBombs(this.context);
       
     if(((this.player.yodaMovement + 100) - (this.bombsNew.bombX + this.bombsNew.bombRadiusFinal)) <this.bombsNew.bombRadiusFinal  && ((this.player.yodaMovement + 100) - (this.bombsNew.bombX - this.bombsNew.bombRadiusFinal)) > 0  && ((this.player.yodaStartHeight ) - (this.bombsNew.bombY ) ) < 0  && ((this.player.yodaStartHeight) - (this.bombsNew.bombY  )) > (-90) 
       ){
        this.score.shield-=1;
        this.score.displayLifes();
        this.player.drawJumpAnimation(this.context);  

        if(this.score.shield <= 0){
            this.score.gameOver();
            
          }
          
         }
      
         if(this.player.controlMechanism.force.pressed){
            this.particleHolder.forEach(yodaPar => yodaPar.drawYodaParticles(this.context,this.player.yodaMovement,this.player.yodaStartHeight))
         }

    }

    iniMultipleObjects(){
        for(let i = 0; i < this.surroundings.numberOfWalls; i++){
            this.objectHolder.push(new DrawSurroundings());
        }
        for(let i = 0; i < this.numberOfParticles;i++){
            this.particleHolder.push(new YodaParticle(this));
        }
    }

}
//mainLoop
const game = new Game(ctx,CANVAS_WIDTH,CANVAS_HEIGHT);
game.mainGameControls()
game.iniMultipleObjects();

const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT*0.85);
    
    game.update();
    requestAnimationFrame(animate)   ; 
}
//endOfLoop

const startBTN = document.querySelector(".startBTN");
const openingScreen = document.querySelector(".opening-screen");
startBTN.addEventListener("click",(e)=>{

    openingScreen.style.display = "none";
    mainGlass.style.display = "block";
    animate();

});

});
