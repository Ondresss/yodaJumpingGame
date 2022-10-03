class YodaParticle extends Player {
    constructor(game){
        super();
        this.angle = Math.random() * 90;
        this.game = game;
        this.yodaParticleX = Math.random() * 122 + Math.sin(this.angle);
        this.yodaParticleY = Math.random() * 122 + Math.sin(this.angle);
        this.particleGravity = 0.1;
        this.particleRadius = 20;


    }
    drawYodaParticles(context,x,y){
        x+=this.yodaParticleX;
        y+=this.yodaParticleY - 80;
     
        context.fillStyle='green';
        context.beginPath();
        context.arc(x,y, this.particleRadius, 0,Math.PI * 2, true);
        context.fill();
        
    }

}
