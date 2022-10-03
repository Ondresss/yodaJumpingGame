class UI {
    constructor(game){
        this.game = game;
        this.userPowerBTN = document.querySelector(".powerUp");
        this.infoBTN = document.querySelector(".infoBTN");
        this.shieldBoostBTN = document.querySelector(".shieldBTN");
        this.randomGen = Math.random();
        this.resultGen = this.randomGen < 0.5 ? 0 : 1;
        this.limitClicker = 0;
    }

    buildInterFace(){
        this.userPowerBTN.style.display = "block";
        this.infoBTN.style.display = "block";
        this.shieldBoostBTN.style.display = "block";

        this.userPowerBTN.addEventListener('click',()=>{

            switch(this.resultGen){
                case 0:
                    this.game.player.powerUpMech[1].Power = false;
                    this.game.player.powerUpMech[0].SpeedUp = true;
                    break;
                case 1:
                    this.game.player.powerUpMech[1].Power = true;
                    this.game.player.powerUpMech[0].SpeedUp = false;
                    break;
            }
          

        });
       // this.infoBTN.addEventListener("click");
        this.shieldBoostBTN.addEventListener("click",()=>{
            if(this.limitClicker>2){
                this.game.score.shield+= 0;
            } else {
                this.limitClicker++;
                this.game.score.shield+= 50;
                this.game.score.displayLifes();
            }


        });

      

    }


}
