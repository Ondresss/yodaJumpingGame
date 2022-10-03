class EnemyBombs {
    constructor(game){
        this.game = game;
        this.bombX = Math.random() * this.game.gameHeight;
        this.bombY = 0;
        this.bombGravity = Math.floor((Math.random() * 5) + 1);
        this.bombRadius = 10;
        this.bombRadiusPlus = 2;
        this.borderExchange = 1;
        this.bombRadiusFinal = 40;
        this.bombFrames = 1;

    }
    invokeBombs(context){
        this.animateBombs();
        this.borderExchange+=this.bombGravity;
        if(this.borderExchange>this.game.gameHeight * 0.82) context.fillStyle='red';
        else context.fillStyle='black';
        context.beginPath();
        context.arc(this.bombX, this.bombY,  this.bombRadius, 0, Math.PI * 2, true);
        context.fill();
        
    }

    animateBombs(){
        if(this.bombY > this.game.gameHeight * 0.82){
            this.bombGravity = 0;
            this.bombRadius+=this.bombRadiusPlus;
            this.bombFrames++;
            if(this.bombRadius>20){
                this.bombRadiusPlus = 0;
                if(this.bombFrames % 200 == 0){
                    this.bombY = 0;
                    this.bombGravity =Math.floor((Math.random() * 5) + 1);
                    this.bombX = Math.random() * 2000 + 4;
                 
           
                }
                
            }

        } else {
            this.bombY+=this.bombGravity;
        } 


       

    }


    
}