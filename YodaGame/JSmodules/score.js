
class Score {
    constructor(game){
        this.game = game;
        this.scoreText = document.querySelector(".scorePanel");
        this.scoreCounter = 0;
        this.shield = 50;
        this.shieldDisplay = document.querySelector(".lifePanel");
        this.timer = 100;
        this.timerSelect = document.querySelector(".timer");
        this.canvas = document.querySelector(".canvas");
        this.menu = document.querySelector(".endingMenu");
        this.endYoda = document.querySelector(".yoda2");
        
      
    }
    displaytext(){
        this.scoreText.style.display = "flex";
        this.scoreText.innerHTML = `
        
            <p>
                SCORE: <span>${this.scoreCounter}</span> 
            </p>
        `;


    }

    displayLifes(){
        this.shieldDisplay.style.display ="flex";
        this.shieldDisplay.innerHTML = `
        
        <p>
            SHIELD: <span>${this.shield}</span> 
        </p>
        
        `;
    }


    displayTimer(){
      
        this.timerSelect.style.display = "flex";
        this.timerSelect.innerHTML = `
        
        <p>
            TIMER: <span>${this.timer}</span> 
        </p>
        
        `;

      
    }



    gameOver(){
        document.querySelector(".bgGlass").style.display = "none";
        this.canvas.style.background = "red";
        this.menu.style.display = "flex";
      
            if(JSON.parse(localStorage.getItem('score'))!=null){
                this.menu.innerHTML = `
        
                <p>
                    YOU LOST!  <a>
                                restart game        
                                </a>
                
                </p>
        
              
                <article>
                  Your score was: ${JSON.parse(localStorage.getItem('score'))}
                 
                </article>`    
            } else {
                this.menu.innerHTML = `
        
                <p>
                    YOU LOST!  <a>
                                restart game        
                                </a>
                
                </p>
        
              
                <article>
                  Your score was: 0 
                 
                </article>`   
            }
        
 
        this.timerSelect.remove();
        this.shieldDisplay.remove();
        this.scoreText.remove();
        this.positionCryingYoda();
        this.reloadPage();
    
       
    }

    positionCryingYoda(){
        this.endYoda.style.width = 100 + "px";
        this.endYoda.style.height = 100 + "px";
        this.endYoda.style.position = "absolute";
        this.endYoda.style.zIndex = 300;
        this.endYoda.style.display = "block";
        this.endYoda.style.top = 55 + "%";
        this.endYoda.style.left = 30 + "%";
    }
    reloadPage(){
        document.querySelector(`a`).addEventListener("click",()=>{
            location.reload();
            localStorage.clear();
        })
    }

}
