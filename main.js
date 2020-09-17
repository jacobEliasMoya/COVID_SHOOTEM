let mainGame  = {
    //decalaring all keyvalue pairs

    //sky area, contains main game
    skyArea : document.querySelector('.sky'),
    // declaring crosshairs 
    crossHairs : document.querySelector('.sky .x'),
    // declaring shot flash 
    skyFlash : document.querySelector('.sky .flash'),
    // declaring main navigation
    mainNav : document.querySelector('.main-nav'),
    //declaring ground
    ground : document.querySelector('.ground'),
    
    //sounds section
    // declaring fire sounds
    fireSound : document.querySelector('#myAudio'),
    // declaring empty shots sound
    emptySound : document.querySelector('#myAudioEmpty'),
    //declaring reloading sound
    reloadSound : document.querySelector('#myAudioReload'),
    //declaring cough sound
    coughSound : document.querySelector('#myAudioCough'),
    //declaring ufo sound
    ufoSound : document.querySelector('#myAudioUfo'),
    //declaring destroyed ufo sound
    ufoBoomSound : document.querySelector('#myAudioBoom'),
    // declaring celbrate song
    celebrateSound : document.querySelector('#myAudioCelebrate'),
    // declaring dancing man
    dancingMan : document.querySelector('.dancer'),
    // declaring reset button 
    resetButton : document.querySelector('.play-again'),


    //declaring score counter
    scoreCounter : document.querySelector('.score-count'),
    //setting total as undefined until set by future function
    scoreTotal : undefined,

    //shotCounts 1/2/3 kay value pairs
    //to be used when a shot is taken
    allSyringe : document.querySelectorAll('.fa-syringe'),
    syringeOne : document.querySelector('.fa-syringe.one'),
    syringeTwo : document.querySelector('.fa-syringe.two'),
    syringeThree : document.querySelector('.fa-syringe.three'),

    // variables to be used with shots 
    emptyShot : document.querySelector('.empty-shot'),
    shotContainer : document.querySelector('.shot-container'),
    lungHits : document.querySelectorAll('.check-lung'),

    //covid icon
    coronaVirus : document.querySelector('.fa .fa-virus .covid'),
    
    //x&y axis to be determined in later function
    covidxAxis:undefined,
    covidyAxis:undefined,


    //storing x and y axis as undefined until function sets value
    xAxis:undefined,
    yAxis:undefined,
    //count of confirmed hits
    shotCount:undefined,
    // position of shot 
    shotPosition:undefined,
    //set to -1 for incremented index in array
    confirmedShots:-1,

    // declaring bonus ufo
    ufoBonus : document.querySelector('.ufo'),

    //will swap between 0/1 to act as a simple on off functionality 
    gameCount : 0,

    //method to get x&y axis of curson on the page
    getAxisXnY(event){
        this.xAxis = event.pageX-(this.crossHairs.clientHeight/1.5);
        this.yAxis = event.pageY-(this.crossHairs.clientWidth*1.65);
        // mainGame.skyArea.innerHTML = `${event.pageX} ${event.pageY}`;
    },

    //method to set the position of a selected div while inside of the ski div
    setCursorPosition(div){
        // simple stylings to reflect mouse position
        div.style.position = 'absolute';
        div.style.top = `${this.yAxis}px `;
        div.style.left = `${this.xAxis}px`;
        div.style.display = ``;
    },

    //method to act as a failsafe if cursor position gets stuck
    clearCursorPosition(div){
        // again, simple stylings to get the job done
        div.style.position = '';
        div.style.top = ``;
        div.style.left = ``;
        div.style.display = `none`;
    },

    //method to start mp3
    initFireSound(){
        if(this.shotCount < 4 ){
            this.fireSound.play();
            this.fireSound.currentTime = 0;
        }
    },
    //method to start mp3

    initEmptySound(){
        if(this.shotCount>3){
            this.emptySound.play();
            this.emptySound.currentTime = 0;
        }
    },
    //method to start mp3

    initReloadSound(){
        this.reloadSound.play();
        this.reloadSound.currentTime = 0;
    },
    //method to start mp3

    initCoughSound(){
        this.coughSound.play();
        this.coughSound.currentTime = 0;
    },
    //method to start mp3

    initHoverSound(){
        this.ufoSound.play();
        this.ufoSound.currentTime = 0;

    },
    //method to stop mp3

    stopHoverGoBoom(){
        this.ufoSound.pause();
    },
    //method to start explosion
    initBoom(){
        this.ufoBoomSound.play(); 
        this.ufoSound.currentTime = 0;

    },
    //method to start song after winning
    initCelebrateSong(){
        this.celebrateSound.play();
        this.celebrateSound.currentTime=0;
    },

    //method to keep track of the shotcount
    shotCounter(){
        // if unum is greater than 0 increment, else give it value of one 
        if(this.shotCount > 0){
            this.shotCount++;
        } else{
            this.shotCount =1;
        }
    },

    //method to display current remaining shots by styiling and removing styles color/textShadow
    // utilizes switch statements
    displayShots(){
        switch(this.shotCount){
            case 1:
                this.syringeOne.style.color = 'grey';
                this.syringeTwo.style.textShadow ='0 0 1rem white';
                this.syringeOne.style.textShadow ='none';

                break;
            case 2:
                this.syringeTwo.style.color = 'grey';
                this.syringeThree.style.textShadow ='0 0 1rem white';
                this.syringeTwo.style.textShadow ='none';

                break;
            case 3:
                this.syringeThree.style.color = 'grey';
                this.syringeThree.style.textShadow ='0 0 1rem white';
                this.syringeThree.style.textShadow ='none';

                break;  
            default:
            return;
        }
    },

    //method to ensure that there are no flashes displayed when out of ammo
    // uses switch statment 
    emptyShots(){
        switch(this.shotCount){
            case 3:
                this.skyFlash.style.height='0px';
                this.skyFlash.style.width='0px';
                this.emptyShot.style.display = 'block';
                this.shotContainer.style.display = 'none';
   
                break;
            default :

        }

    },

    // method to reload 'shots'
    reloadShots(){

        //resetting shot count to 0
        this.shotCount=0;

        //resettign flash styles
        this.skyFlash.style.height='';
        this.skyFlash.style.width='';

        //removing empty shot wording and displaying 'shots'
        this.emptyShot.style.display = 'none';
        this.shotContainer.style.display = 'flex';

        //foreach loop to go throught and style all syringes at one time
        this.allSyringe.forEach(s=>{
            s.style.color='red';
            this.syringeOne.style.textShadow ='0 0 1rem white';
        })

    },

    //method to increment score
    scoreIncrement(){
        // if scoretotal is undefines, then the score val is updated as well as the inner html of element else add 100 to score and update html
        if(this.scoreTotal===undefined){
            this.scoreTotal=100;
            this.scoreCounter.innerHTML=this.scoreTotal;
        } else {
            this.scoreTotal += 100;
            this.scoreCounter.innerHTML = this.scoreTotal ;

        }
    },

    //method to increment confirmed shots, as well as run 2 functions
    // one to increment score above, as well as cound off a cough
    confirmedShot(){
        
        this.confirmedShots++;
        this.scoreIncrement();
        this.initCoughSound();
    },

    // based off an index determined at a later time, the lung displayed will be marked with a red x
    displayConfirmedShot(ind){
        this.lungHits[ind].innerHTML='X';
    },

    //method to intially insert the 1 corona virus that will be used through the game
    insertCoronaVirus(){
        //saving virus var
        let virus = document.createElement('I');

        //adding 3 classes to ensure proper stylings
        virus.classList.add('fas');
        virus.classList.add('fa-virus');
        virus.classList.add('covid');
        
        // saving keyvalue pair
        this.coronaVirus=virus;

        //appending the element to the sky area
        this.skyArea.appendChild(this.coronaVirus);

    },

    //method to reset the position of the virus after the 1st one is 'shot' 
    resetPos(){
        //setting empty array
        let animations = [] ;
        //array of various starting points
        let startingPoint = ['5%','10%','15%','20%','25%','30%','35%','40%','45%','50%','55%','60%','65%','70%','75%','80%','85%','90%','95%']
        //setting the virus starting point 
        this.coronaVirus.style.left = startingPoint[Math.floor(Math.random()*startingPoint.length)]
        //resetting animation shortcut (thank you internet lol)
        this.coronaVirus.style.animation = 'none';
        this.coronaVirus.offsetHeight;
        this.coronaVirus.style.animation = null;
    },

    //method to destry the ufo for bonus points
    bonusPoints(){
        //setting the display to none
        this.ufoBonus.style.display='none';
        
        //if else to determine if undefined/ no score yet set(snippet from increment score function/ simply changed value)
        if(this.scoreTotal===undefined){
            this.scoreTotal=500;
            this.scoreCounter.innerHTML=this.scoreTotal;
        } else {
            this.scoreTotal += 500;
            this.scoreCounter.innerHTML = this.scoreTotal ;

        }



    },

    //method to beign the bonus round
    startUfo(){
        // based off ofnum of confimed shots, adjust styles and initiate sounds 
        if(this.confirmedShots===4){
            this.ufoBonus.style ='animation: ufoGo 12s 1 0s forwards; display:inline'
            this.initHoverSound();
        }
    },

    //method to initiate gameover
    gameOver(){
        //simple alert to notify user
        alert('GAME OVER');

        // adding in styles to display dancing man and remove virus from display 
        this.coronaVirus.style.display='none';
        this.dancingMan.style.display='inline';
        //displaying reset/ play again button
        this.resetButton.style.display='inline'; 

    },

    //function to check if game is actually over based of num of confimed shots
    gameOverVer(){
            if(this.confirmedShots===9){
                // after checking confirmed shots, check to see if game count is 1
                while(this.gameCount<1){
                    //run game over function/celbrate song/increment the game count
                    this.gameOver();
                    this.initCelebrateSong();
                    this.gameCount++;//hmm iss this line causing a bug?.. check function
                }
            }
    },

    // method containing the styles that 'reset' the game back to the original state
    resetGame(){
        //stops song from playing
        this.celebrateSound.pause();
        // resets the score fo the game
        this.scoreTotal = 0;
        //displays original 0000 text
        this.scoreCounter.innerHTML='0000';
        // resetting the 3 elements back to orginal stylesheets stylings
        this.dancingMan.style.display ='';
        this.resetButton.style.display ='';
        this.coronaVirus.style.display ='';
        // resetting the lungs through a foreach loop back to orginal stylesheets stylings
        this.lungHits.forEach(l=>{
            l.innerHTML ='';
        })

        //resetting the shots and game count back to original values
        this.confirmedShots =-1;
        this.gameCount=0;


    }




}

//initial insertion of corona virus
mainGame.insertCoronaVirus();



//skyarea mouse move to track divs
mainGame.skyArea.addEventListener('mousemove',(e)=>{
    mainGame.getAxisXnY(e);
    mainGame.setCursorPosition(mainGame.crossHairs);
    mainGame.setCursorPosition(mainGame.skyFlash);
})

//onclick runs the below methods
mainGame.skyArea.addEventListener('click',(e)=>{
    mainGame.shotCounter();
    mainGame.initFireSound();
    mainGame.initEmptySound();
    mainGame.displayShots();
    mainGame.emptyShots();
    mainGame.gameOverVer();

})

//on mouseleave the crosshairs position is cleared
mainGame.skyArea.addEventListener('mouseleave',(e)=>{
    mainGame.clearCursorPosition(mainGame.crossHairs);
})

//reload button also ** more than one use from var
mainGame.emptyShot.addEventListener('click',()=>{
    mainGame.reloadShots();
    mainGame.initReloadSound();
})

// method to run on click of loaded shots on virus 
mainGame.coronaVirus.addEventListener('click',()=>{

    // checks to see if the shots are between 2 nums to ensure that there IS ammo in weapon
    if(mainGame.shotCount>0 && mainGame.shotCount<3){
        // runs below methods 
        mainGame.confirmedShot();
        mainGame.displayConfirmedShot(mainGame.confirmedShots);
        mainGame.resetPos();
        mainGame.startUfo();


    } else{
        return;
    }
    

})

// method to run when someone clicks the ufo **more animations to come!
mainGame.ufoBonus.addEventListener('click',()=>{
    // run within if statement to ensure ammo IS loaded  
    if(mainGame.shotCount>0 && mainGame.shotCount<3){
        // run below methods 
        mainGame.bonusPoints();
        mainGame.stopHoverGoBoom();
        mainGame.initBoom();
    }
})

// onclick of reset button method to be run
mainGame.resetButton.addEventListener('click',()=>{
    //run below function
    mainGame.resetGame();

})