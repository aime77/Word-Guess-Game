
var guide_ID=document.getElementById("guide");
var wins_ID = document.getElementById("wins");
var losses_ID = document.getElementById("losses");
var lives_ID = document.getElementById("lives");
var wordPH_ID = document.getElementById("wordPH");
var newRound_ID = document.getElementById("newRound");
var incorrectL_ID = document.getElementById("incorrectL");


var game = {
    wordList: ["galaxy", "stars", "black hole", "dark energy", "planet", "nebula", "quasars", "gravity", "dark matter", "comets", "white dwarfs", "supernovas"],
    guide: "",
    chosenWord: "",
    wordPH: [],
    lives: 10,
    wins: 0,
    losses: 0,
    active: false,
    incorrectL: [],
    tries: [],
    //function to start game
    newRound: function () {
        this.lives = 10;
        this.active = true;
        this.incorrectL = [];
        this.tries = [];
        this.wordPH = [];
    //choosing random word from array
        this.chosenWord = this.wordList[Math.floor(Math.random() * (this.wordList.length))];
    //transforming the word's letters to '_' and keeping the spaces if necessary. The word now will be inn wordPH array (each '_' separated by a comma).
        
    for (var i = 0; i < this.chosenWord.length; i++) {
            if (this.chosenWord[i] === ' ') {
                this.wordPH.push('  ');
            }
            else {
                this.wordPH.push('_');
            }
        }

        //HTML elements for a new game:
        //Reset the total number of lives    
        lives_ID.textContent = this.lives;
        //The '_' in wordPH array will be joined with join ' ' instead of a ',' 
        wordPH_ID.textContent = this.wordPH.join(' ');
        incorrectL_ID.textContent = this.incorrectL;

        if (this.chosenWord==="galaxy"){
            this.guide="A galaxy is a gravitationally bound system of stars, stellar remnants, interstellar gas, dust, and dark matter. ";
            guide_ID.textContent=this.guide;
            }
            
            else if   (this.chosenWord==="stars"){
            this.guide="A type of astronomical object consisting of a luminous spheroid of plasma held together by its own gravity. ";
            guide_ID.textContent=this.guide;
            }
            
            else if(this.chosenWord==="black hole"){
            this.guide="A region of spacetime exhibiting such strong gravitational effects that nothing—not even particles and electromagnetic radiation such as light—can escape from inside it.";
            guide_ID.textContent=this.guide;
            }
            
            else if(this.chosenWord==="dark energy"){
            this.guide="It's an unknown form of energy which is hypothesized to permeate all of space, tending to accelerate the expansion of the universe.   ";
            guide_ID.textContent=this.guide;
            }
             
            else if(this.chosenWord==="planet"){
            this.guide="A large, round object in space that moves around a star";
            guide_ID.textContent=this.guide;
            }
            
            else if (this.chosenWord==="nebula"){
            this.guide="An interstellar cloud of dust, hydrogen, helium and other ionized gases. Originally, named for any diffuse astronomical object, including galaxies beyond the Milky Way.";
            guide_ID.textContent=this.guide;
            }
            
            else if (this.chosenWord==="quasars"){
            this.guide="An extremely luminous active galactic nucleus. It has been theorized that most large galaxies contain a supermassive central black hole with mass ranging from millions to billions of solar masses.";
            guide_ID.textContent=this.guide;
            }
            
            else if (this.chosenWord==="gravity"){
            this.guide="A natural phenomenon by which all things with mass or energy—including planets, stars, galaxies, and even light—are brought toward (or gravitate toward) one another.";
            guide_ID.textContent=this.guide;
            }
            
            else if(this.chosenWord==="dark matter"){
            this.guide="A hypothetical form of matter that is thought to account for approximately 85% of the matter in the universe, and about a quarter of its total energy density. ";
            guide_ID.textContent=this.guide;
            }
            
            else if (this.chosenWord==="comets"){
            this.guide="Comets are cosmic snowballs of frozen gases, rock and dust that orbit the Sun. When frozen, they are the size of a small town.";
            guide_ID.textContent=this.guide;
            }
            
            else if (this.chosenWord==="white dwarfs"){
            this.guide="A small very dense star that is typically the size of a planet. A white dwarf is formed when a low-mass star has exhausted all its central nuclear fuel and lost its outer layers as a planetary nebula.";
            guide_ID.textContent=this.guide;
            }
            
            else if(this.chosenWord==="supernovas"){
            this.guide="A transient astronomical event that occurs during the last stellar evolutionary stages of a star's life, either a massive star or a white dwarf, whose destruction is marked by one final, titanic explosion.";
            guide_ID.textContent=this.guide;
            }

    },



    //Function to guess letter receives a letter as an argument 

    guessLetter: function (letter) {
    //indexof a letter in the array tries -1 means that the letter is not found or has not been guessed by the user.
    //the game must be active for the user to guess a letter  
    //if the letter is not in the tries array and is active, push the letter to the tries array   
        if (this.tries.indexOf(letter) === -1 && this.active === true) {
            this.tries.push(letter);
    //checking if the guess is right: If the letter is in lower case just like the chosen letter's word, the chosen letter will be replaced in the wordPH aray with that letter.   
            for (var i = 0; i < this.chosenWord.length; i++) {
                if (this.chosenWord[i].toLowerCase() === letter.toLowerCase()) {
                    this.wordPH[i] = this.chosenWord[i];
                }
            }

            //passing new wordPH content
            wordPH_ID.textContent = this.wordPH.join(' ');
            this.incorrectLF(letter);

        } else {
            if (this.active === false) {
                alert("The game is inactive!");
            }
            else {
                alert("You have guessed this letter before.");
            }
        }
    },

    //user wins 1 point as the chosen word (in upper or lower case) is the same at the letters in the array wordPH without the commas (join(''))
    //in this function the game should be turned off to start a new word next round 
    pointsF: function () {
        if (this.chosenWord.toUpperCase() === this.wordPH.join('').toUpperCase() || this.chosenWord.toLowerCase() === this.wordPH.join('').toLowerCase()) {
            this.wins+=1;
            this.active = false;
            wins_ID.textContent = this.wins;
        }
    },

    //if there are no remaining lives or chances, 1 point gets added to losses and again game resets
    lossesF: function () {
        if (this.lives === 0) {
            this.losses++;
            this.active = false;

            losses_ID.textContent = this.losses;
            wordPH_ID.textContent = this.chosenWord;
        }
        this.pointsF();
    },


    incorrectLF: function (letter) {
        if (this.chosenWord.indexOf(letter.toLowerCase()) === -1 && this.chosenWord.indexOf(letter.toUpperCase()) === -1) {
            this.lives -= 1;
            this.incorrectL.push(letter);
            incorrectL_ID.textContent = this.incorrectL.join(" ");
            lives_ID.textContent = this.lives;
        }
        this.lossesF();

    }



};

//button to start
newRound_ID.addEventListener('click', function() {game.newRound()});
//eventful event
document.onkeyup = function (event) {
    if (event.keyCode > 64 && event.keyCode < 91) {
        game.guessLetter(event.key);
    }

};

