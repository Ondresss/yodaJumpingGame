class Enemy {
    constructor(game){
        this.game = game;
        this.heightForE = this.game.gameHeight;
        this.widthForE = this.game.gameWidth;
        this.enemyStartX =  this.widthForE;
        this.enemyStartY = 50;
        this.enemySpeed = 4;
        this.context = this.game.context;
        this.enemyProjectileX = 600;
        this.enemyProjectileY = this.enemyStartY;
        this.enemyImage = document.querySelector(".enemyImage");
        this.switchFrames = 0;
    }

    invokeEnemy(context){
       this.animateEnemies();
        context.drawImage(this.enemyImage, this.enemyStartX,this.enemyStartY,100,100);
        
        
        
    }
   animateEnemies(){
        if(this.enemyStartX<600){
            this.enemySpeed = 0;
            this.enemyProjectile(this.context);
        }
        this.enemyStartX-=this.enemySpeed;;
    }
    enemyProjectile(context){
       this.animateProjectiles();
        context.fillStyle = 'red';
        context.fillRect(this.enemyProjectileX ,this.enemyProjectileY,30,30);
    }
   animateProjectiles(){
        if(this.enemyProjectileY>400){
            this.enemyProjectileX = 600;
            this.enemyProjectileY = 20;
            this.switchFrames++;
        } else if(this.switchFrames > 2){
            this.enemyProjectileX+=Math.random() * (4) + 1 ;
            this.enemyProjectileY+=Math.random() * (2) + 1;
            
            
        } else if(this.switchFrames > 5){
            this.enemyProjectileX-=Math.random() * (10) + 1 ;
            this.enemyProjectileY+=Math.random() * (1) + 1 ;
           

        } else if(this.switchFrames > 7){
            this.enemyProjectileX-=Math.random() * (2) + 1 ;
            this.enemyProjectileY+=Math.random() * (3) + 1 ;
            this.switchFrames = 0;
        } else {
            this.enemyProjectileX+=Math.random() * (4) + 2 ;
            this.enemyProjectileY+=Math.random() * (2) + 1 ;
        }
       

       
     
    }
}