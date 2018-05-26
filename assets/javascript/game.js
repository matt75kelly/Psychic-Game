var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var guessLeft = 9;
var guessesDone = " ";
var wins = 0;
var losses = 0;
var computerLetter = "?";

// need a function to generate a Computer Guess
function computerAnswer(){
    computerLetter = letters[Math.floor(Math.random()*26)];
}
// need a function to check the input to make sure that it is a letter
function checkGuess(guess) {
    var isLetter = false;
    for(var i = 0; i < letters.length; i++){
        if (guess === letters[i]){
            isLetter = true;
            i += 26;
        }
    }
    return isLetter;
}
// adding a function to test whether or not the player has already guessed that number.
function isUnique(guess){
    var isSpecial = true;
    for (i = 0; i < guessesDone.length - 1; i++){
        if (guess === guessesDone[i]){
            isSpecial= false;
        }
    }

    return isSpecial;
}
// need a function to test whether or not the guess is a match
function testGuess(guess) {
    var isMatch = false;
    if (guessLeft >0 && guess === computerLetter){
        isMatch = true;
    }
    return isMatch;
}
// need a function to update the scores and guesses on the screen
function updateScores(){
    var winSpan = document.getElementById("winScore");
    var lossSpan = document.getElementById("lossScore");
    var guessSpan = document.getElementById("guessesLeft");
    var guessList = document.getElementById("guessedLetters");

    guessList.textContent = guessesDone;
    winSpan.textContent = wins;
    lossSpan.textContent = losses;
    guessSpan.textContent = guessLeft;
}
function resetGame(){
    guessesDone= " ";
    computerAnswer();
    guessLeft = 9;
}
// calling the functions.
computerAnswer();
updateScores();
document.onkeyup = function(event) {
    var playerKey= event.key.toUpperCase();
    if (checkGuess(playerKey) && isUnique(playerKey)){
        guessesDone = playerKey + ", " + guessesDone;
        document.getElementById("winBanner").style.display = "none";
        document.getElementById("lostBanner").style.display = "none";
        
        if (testGuess(playerKey) && guessLeft >0){
            wins++;
            guessLeft--;
            updateScores();
            resetGame();
            document.getElementById("winBanner").style.display = "block";
        }
        else if (!testGuess(playerKey) && guessLeft <= 1) {
            losses++;
            guessLeft--;
            updateScores();
            resetGame();
            document.getElementById("lostBanner").style.display = "block";
        }
        else {
            guessLeft--;
            updateScores();
        }
    }
    else if (checkGuess(playerKey) && !isUnique(playerKey)){
        confirm("You've Already Guessed That Letter Silly!");
    }
    else if (!checkGuess(playerKey)){
        confirm("I don't recognize that key... Maybe try a Letter??");
    }
}