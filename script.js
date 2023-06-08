// import valid word array
import validWords from "./wordlist.js"

// get DOM elements
const resultMsg = document.getElementById("result-msg")
const keyboardKey = document.querySelectorAll(".key")
const enterKey = document.getElementById("enter")
const backspaceKey = document.getElementById("backspace")
const backspaceImg = document.getElementById("back")
const squares = document.querySelectorAll(".display-container > div")
const treasureBtn = document.getElementById("treasure-hunt")
const treasureResetBtn = document.getElementById("treasure-reset")
const wordleBtn = document.getElementById("return-wordle")
const btnAudio = document.getElementById("btn-audio")
const winAudio = document.getElementById("win-audio")
const loseAudio = document.getElementById("lose-audio")
const keyAudio = document.getElementById("key-click")
const squareAudio = document.getElementById("square-click")
const buttons = document.querySelectorAll(".options")
const hintsMsg = document.getElementById("hints")
const hintsBtn = document.getElementById("hints-btn")

// initialize counters
let rowNum = 1;
let i = 0;

// generate random word from valid word array
function randomWord() {
    let randomIndex = Math.floor(Math.random() * validWords.length);
    return validWords[randomIndex];
}
let secretWord = randomWord();
let lettersOfWord = secretWord.split("")
console.log(secretWord);

// add event listeners to keyboard keys
for (let key of keyboardKey) {
    key.addEventListener("click", keyPress);
    key.addEventListener("click", playKeySound);
}
backspaceKey.addEventListener("click", backspace);
backspaceImg.addEventListener("click", backspace);
enterKey.addEventListener("click", enter);
treasureBtn.addEventListener("click", generateTreasure);
treasureResetBtn.addEventListener("click", generateTreasure);
wordleBtn.addEventListener("click", wordleMode);
hintsBtn.addEventListener("click", showHint);
hintsMsg.addEventListener("click", freeHint);


// backspace function
function backspace() {
    if (i > 0 && rowNum === 1) {
        squares[i -1].textContent = "";
        i--;
    }
    if (i > 0 && rowNum === 2) {
        squares[i + 5 -1].textContent = "";
        i--;
    }
    if (i > 0 && rowNum === 3) {
        squares[i + 10 - 1].textContent = "";
        i--;
    }
    if (i > 0 && rowNum === 4) {
        squares[i + 15 - 1].textContent = "";
        i--;
    }
    if (i > 0 && rowNum === 5) {
        squares[i +20 - 1].textContent = "";
        i--;
    }
    if (i > 0 && rowNum === 6) {
        squares[i + 25 - 1].textContent = "";
        i--;
    }
    if (i < 5) { 
        enterKey.style.backgroundColor = "#EFF9FF";
        for (let key of keyboardKey) {
            key.style.backgroundColor = "#EFF9FF"
            key.style.color = "#0068AB"
            key.style.opacity = "100%";
            
        }
        for (let square of squares) {
            if (square.style.backgroundColor === "lightgrey") {
                for (let key of keyboardKey) {
                    if (key.textContent === square.textContent) {
                        key.style.background = "lightgrey";
                        key.style.opacity = "40%"
                    }
                }
            }
        }
    }
}

// retrieve user guesses
function getWord(row) {
    let chosenWord = "";
    if (row === 1) {
       for (let x = 0; x < 5; x++) {
           chosenWord += squares[x].textContent;
       }         
    } else if (row === 2) {
        for (let x = 5; x < 10; x++) {
            chosenWord += squares[x].textContent;
        }
    } else if (row === 3) {
        for (let x = 10; x < 15; x++) {
            chosenWord += squares[x].textContent;
        }
    } else if (row === 4) {
        for (let x = 15; x < 20; x++) {
            chosenWord += squares[x].textContent;
        }
    } else if (row === 5) {
        for (let x = 20; x < 25; x++) {
            chosenWord += squares[x].textContent;
        }
    } else if (row === 6) {
        for (let x = 25; x < 30; x++) {
            chosenWord += squares[x].textContent;
        }
    }
    return chosenWord;
}

// compares user guess with secret word, changes squares color if letter is included/in the right spot
function enter() {
    if (i === 5) {
        let chosenWord = getWord(rowNum);
        if (!validWords.includes(chosenWord)) {
            resultMsg.textContent = "Please enter a valid word!";
            return;
        }
        let indexStart = (rowNum - 1) * 5;
        let indexEnd = rowNum * 5;
        for (let i = indexStart; i < indexEnd; i++) {
            let square = squares[i];
            let guessedLetter = square.textContent;
            if (lettersOfWord.includes(guessedLetter)) {
                square.style.transition = "all 1s";
                square.style.backgroundColor = "#F5C4A8";
            }
            if (lettersOfWord[i -indexStart] === guessedLetter) {
                square.style.transition = "all 1s";
                square.style.backgroundColor = "#D9F5A8";
            }
            if (!lettersOfWord.includes(guessedLetter)) {
                square.style.transition = "all 1s";
                square.style.backgroundColor = "lightgrey";
                square.style.opacity = "50%";
            }
        }
        for (let key of keyboardKey) {
            key.style.backgroundColor = "#EFF9FF"
            key.style.color = "#0068AB"
            key.style.opacity = "100%";
        }
        rowNum++
        i = 0;
        resultMsg.textContent = chosenWord;

        for (let square of squares) {
            if (square.style.backgroundColor === "lightgrey") {
                for (let key of keyboardKey) {
                    if (key.textContent === square.textContent) {
                        key.style.background = "lightgrey";
                        key.style.opacity = "40%"
                    }
                }
            }
        }

        if (chosenWord === secretWord) {
            setTimeout(function() {
                alert("you guessed the word!");
                playWinSound();
                reset()
            }, 1000)
        }
    }
}

// onclick function for the keyboard keys
function keyPress(event) {
   if (event.target.id !== "enter" && event.target.id !== "backspace" && i !== 5) {
        if (rowNum === 1) {
            squares[i].textContent = event.target.textContent;
        } else if (rowNum === 2) {
            squares[i + 5].textContent = event.target.textContent;
        } else if (rowNum === 3) {
            squares[i + 10].textContent = event.target.textContent;
        } else if (rowNum === 4) {
            squares[i + 15].textContent = event.target.textContent;
        } else if (rowNum === 5) {
            squares[i + 20].textContent = event.target.textContent;
        } else if (rowNum === 6) {
            squares[i + 25].textContent = event.target.textContent;
        }
        i++;
    }
    if (i === 5) {
        enterKey.style.backgroundColor = "#D9F5A8"
        for (let key of keyboardKey) {
            if (key.id !== "backspace" && key.id !== "enter") {
                key.style.backgroundColor = "lightgrey";
                key.style.color = "white";
                key.style.opacity = "50%";
            }
        }
    }
}

function reset() {
    lettersGiven = [];
    secretWord = randomWord();
    console.log(secretWord);
    lettersOfWord = secretWord.split("");
    rowNum = 1;
    i = 0;
    hintsUsed = 0;
    resultMsg.textContent = "Guess the word!";
    for (let square of squares) {
        square.textContent = "";
        square.style.backgroundColor = "#EFF9FF";
        square.style.opacity = "100%";
    }
    for (let key of keyboardKey) {
        key.style.backgroundColor = "#EFF9FF";
        key.style.opacity = "100%";
        key.style.color = "#0068AB"
    }
}

function randomSquare() {
    let randomIndex = Math.floor(Math.random() * squares.length);
    return squares[randomIndex];
}
function generateTreasure() {
    reset();
    if (hints > 0) {
        hintsMsg.textContent = `Hints remaining: ${hints}`;
        hintsMsg.style.display = "block";
    }
    wordleBtn.style.display = "inline";
    hintsBtn.style.display = "none";
    attempts = 0;
    y = 0;
    resultMsg.textContent = "Find the treasure! You have 6 guesses.";
    treasureBtn.style.display = "none";
    treasureResetBtn.style.display = "inline";
    for (let square of squares) {
        square.removeEventListener("click", userGuess);
        square.removeEventListener("click", playSquareSound);
        square.addEventListener("click", userGuess);
        square.addEventListener("click", playSquareSound);
    }
    for (let key of keyboardKey) {
        key.removeEventListener("click", keyPress);
        key.removeEventListener("click", playKeySound);
        key.addEventListener("mouseenter", function() {
            key.style.backgroundColor = "#AADAF5";
            key.style.opacity = "50%";
            key.style.borderColor = "white";
            key.style.transition = "all 0.15s";
            key.style.scale = "102%";
        })
        key.addEventListener("mouseleave", function() {
            key.style.backgroundColor = "#EFF9FF";
            key.style.opacity = "100%";
            key.style.border = "3px solid #DEF1FF";
            key.style.scale = "100%"

        })
    }
    let randomSquare1 = randomSquare();
    randomSquare1.classList.add("treasure")
    console.log(randomSquare1);
    let randomSquare2 = randomSquare();
    randomSquare2.classList.add("treasure")
    console.log(randomSquare2);
    let randomSquare3 = randomSquare();
    randomSquare3.classList.add("treasure");
    console.log(randomSquare3);
}

let hints = 0;
let attempts = 0;
let y = 0;
function userGuess(event) {
    let guessesLeft = 5 - attempts;

    if (attempts < 6) {
        if (event.target.classList.contains("treasure")) {
            event.target.style.backgroundColor = "green";
            event.target.style.opacity = "75%";
            attempts--
            resultMsg.textContent = `Find the treasure! You have ${guessesLeft} guesses.`;
            y++
        } else {
            resultMsg.textContent = `Find the treasure! You have ${guessesLeft} guesses.`;
            event.target.style.backgroundColor = "red";
            event.target.style.opacity = "75%";
        }
    }
    attempts++
    if (y === 3) {
        attempts = 6;
        setTimeout(function() {
            alert("You found all 3 chests! Congratulations!")
        }, 700)
        playWinSound();
        hints++
        for (let square of squares) {
            if (square.classList.contains("treasure")) {
                square.classList.remove("treasure");
            }
        }
        generateTreasure();
        return;
    }
    if (attempts > 6) {
        resultMsg.textContent = `You found ${y}/3 treasure chests!`
        if (attempts === 7) {
            playLoseSound();
        }
        for (let square of squares) {
            square.removeEventListener("click", playSquareSound);
            if (square.classList.contains("treasure")) {
                square.classList.remove("treasure");
            }
        }
    }
}


function wordleMode() {
    wordleBtn.style.display = "none";
    hintsBtn.style.display = "inline";
    treasureResetBtn.style.display = "none";
    treasureBtn.style.display = "inline";
    reset();
    for (let square of squares) {
        square.removeEventListener("click", userGuess);
        square.removeEventListener("click", playSquareSound);
    }
    for (let key of keyboardKey) {
        key.addEventListener("click", keyPress);
        key.addEventListener("click", playKeySound);
    }
    attempts = 0;
    y = 0;
    
    if (hints > 0) {
        hintsMsg.textContent = `Hints remaining: ${hints}`;
        hintsMsg.style.display = "block";
    }
}

function randomHint() {
    return Math.floor(Math.random() * lettersOfWord.length);
}
let latestHint = ""
let lettersGiven = [];
let hintsUsed = 0;
let maxHints = 3;
function showHint() {
    let newHint = ""
    if (hints > 0 && hintsUsed < maxHints) {
        if (lettersGiven.length < lettersOfWord.length) {
            let randomIndex = randomHint();
            newHint = secretWord[randomIndex];
            while (lettersGiven.includes(newHint) && lettersGiven.length < lettersOfWord.length) {
                randomIndex = randomHint();
                newHint = secretWord[randomIndex];
            }
            lettersGiven.push(newHint);
        }
        latestHint = newHint;
        resultMsg.textContent = `Word contains: ${latestHint}`;
        hints--;
        hintsUsed++;
        hintsMsg.textContent = `Hints remaining: ${hints}`;
    } else if (hintsUsed === 3) {
        resultMsg.textContent = `Max hints reached. ${lettersGiven.join(" ")}`
    } else {
        resultMsg.textContent = `No hints available. ${lettersGiven.join(" ")}`
        hintsMsg.style.display = "none";
    }
}

function freeHint() {
    hints++
    hintsMsg.textContent = `Hints remaining: ${hints}`;
}

function playSound() {
    btnAudio.currentTime = 0;
    btnAudio.play();
}
for (let button of buttons) {
    button.addEventListener("click", playSound)
}

function playWinSound() {
    winAudio.currentTime = 0;
    winAudio.play();
}

function playLoseSound() {
    loseAudio.currentTime = 0;
    loseAudio.play();
}

function playKeySound() {
    keyAudio.currentTime = 0;
    keyAudio.play();
}

function playSquareSound() {
    squareAudio.currentTime = 0;
    squareAudio.play();
}

