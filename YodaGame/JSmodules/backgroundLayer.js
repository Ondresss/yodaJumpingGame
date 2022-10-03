class layer {
    constructor(game){
        this.game = game;
        this.bgImage = document.querySelector(".bg");
        this.bgWidth = innerWidth;
        this.bgHeight = innerHeight;
        this.bgX = 0;
        this.bgY = 0;
        this.bg2X = innerWidth;
        this.bg2Y = 0;
    }
    drawLayer(context){
       context.drawImage(this.bgImage, this.bgX,  this.bgY, this.bgWidth, this.bgHeight);
        context.drawImage(this.bgImage, this.bg2X, this.bg2Y, this.bgWidth, this.bgHeight);
        
        
    }
    animateLayer(){
        if(this.bgX < -innerWidth){
            this.bgX = 0;
            
           
        } else if(this.bg2X < 0){
            this.bg2X = innerWidth;
        } else {
            this.bgX-=1;
            this.bg2X-=1;
        }

  
    }
}