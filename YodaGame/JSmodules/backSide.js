class backSide{

    constructor(game){
        this.game = game;
        this.backDoor = document.querySelector(".hole");
        this.backdoorX = 0;
        this.backdoorY = innerHeight * 0.79;
        this.colPole = [];
    }
    drawLevel(context){
        this.drawBackDoor(context);
        this.checkColLevel();

    }

    drawBackDoor(context){
        context.drawImage(this.backDoor, this.backdoorX , this.backdoorY, 160, 140);
        
        
    }

    checkColLevel(){
        if(this.game.player.yodaMovement > this.backdoorX && this.game.player.yodaMovement < this.backdoorX + 160){
            this.colPole.push("fall");
          
        } else {
            for(let i = 0; i < this.colPole.length;i++){
                this.colPole[i] = 0;
            }

        }
    }


}