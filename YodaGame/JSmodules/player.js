class Player {
    constructor(game){
        this.game = game;
        this.yoda = document.querySelector(".yoda");
        this.yodaStartHeight = 200;
        this.yodaMovement = innerWidth /  2;
        this.gravity = 0.01;
        this.controlKeys = [];
        this.yoda2 = document.querySelector(".yoda2");
        this.limitForce = 0;
        this.limitJump = 0;
        this.controlMechanism =  {
            right: {
                pressed: false,
            },
            left: {
                pressed: false,
            },
            stop:{
                pressed:false,
            },
            force: {
                pressed:false
            }
        };

        this.powerUpMech = [
            {
                SpeedUp: false,
                Text: "Speed up activated"
            },

            {
                Power: false,
                Text: "Super power activated"

            }

        ]

    }
    drawPlayer(context){
        
    context.drawImage(this.yoda, this.yodaMovement, this.yodaStartHeight, 100, 100);
            
    }


    drawJumpAnimation(context){
        context.drawImage(this.yoda2, this.yodaMovement, this.yodaStartHeight, 100, 100);
    }

    controls(){
        window.addEventListener('keypress',(e)=>{
         
            switch(e.key){
                case "d":
                    this.controlMechanism.right.pressed = true;
                    this.controlMechanism.left.pressed = false;
                    this.controlMechanism.stop.pressed = false;
                    break;
                case "a":
                    this.controlMechanism.left.pressed = true;
                    this.controlMechanism.right.pressed = false;
                    this.controlMechanism.stop.pressed = false;
                    break;
                case "s":
                    this.controlMechanism.stop.pressed = true;
                    this.controlMechanism.left.pressed = false;
                    this.controlMechanism.right.pressed = false;
                    break;
            }



        });
   

        window.addEventListener('keydown',(e)=>{
          
            if(e.key == ' '){
        
                    this.limitForce++;
                    this.controlMechanism.force.pressed = true;

                    window.addEventListener('mousemove',(e)=>{
                        if(this.controlMechanism.force.pressed == false){
                            console.log("nope");
                            document.body.style.cursor = "default";
                        } else {

                            document.body.style.cursor = "pointer";
                            this.game.surroundings.platformY = e.y;
                            this.game.surroundings.platformX = e.x;

                        }
                   
                    });

            }

            if(e.key == 'w'){
           
                if(this.limitJump>=3){
                    console.log("you cant jump more");
             
                }  else {
                    this.limitJump++;
                    this.controlKeys.push("spaceBar");
    
                }
             
            }



        });

        window.addEventListener('keyup',(e)=>{

            if(e.key == ' '){
                this.controlMechanism.force.pressed = false;
             
            }
            if(e.key == 'w'){
                this.limitJump--;
             
            }

        });

    }


}