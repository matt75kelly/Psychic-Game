var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var guessLeft = 9;
var guessesDone = " ";
var wins = 0;
var losses = 0;
var computerLetter = "?";

// need a function to generate a Computer Guess
function computerAnswer(){
    computerLetter = letters[Math.floor(Math.random()*26)];
    console.log(computerLetter);
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
    console.log("isLetter: " + isLetter);
    return isLetter;
}
// adding a function to test whether or not the player has already guessed that number.
function isUnique(guess){
    var isSpecial = true;
    for (i = 0; i < guessesDone.length - 1; i++){
        if (guess === guessesDone[i]){
            isSpecial= false;
        }
        console.log("PlayerKey: " + guess);
        console.log("GuessesDone[i]: " + guessesDone[i]);
    }

    return isSpecial;
}
// need a function to test whether or not the guess is a match
function testGuess(guess) {
    var isMatch = false;
    if (guessLeft >0 && guess === computerLetter){
        isMatch = true;
    }
    console.log("isMatch: " + isMatch);
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
console.log("Player Guesses: " + guessesDone);
document.onkeyup = function(event) {
    var playerKey= event.key.toUpperCase();
    if (checkGuess(playerKey) && isUnique(playerKey)){
        guessesDone = playerKey + ", " + guessesDone;
        console.log("GuessesDone.Length: " + guessesDone.length);
        if (testGuess(playerKey) && guessLeft >0){
            wins++;
            guessLeft--;
            resetGame();
            updateScores();
            confirm("You Guessed Right! Way to Go!!");
        }
        else if (!testGuess(playerKey) && guessLeft <= 1) {
            losses++;
            guessLeft--;
            resetGame();
            updateScores();
            confirm("Sorry! Those Weren't My Letter! Try Again?");
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