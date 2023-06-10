// IMPORT VALID WORD ARRAY
import validWords from "./wordlist.js"

// RETRIEVE DOM ELEMENTS AND STORE THEM AS VARIABLES
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

// INITIALIZE BUTTON & KEY EVENT LISTENERS
function initializeEventListeners() {
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
}
window.onload = initializeEventListeners;

// INITIALIZE GLOBAL COUNTERS
let rowNum = 1;
let i = 0;
let hints = 0;
let attempts = 0;
let y = 0;
let maxHints = 3;
let lettersGiven = [];
let hintsUsed = 0;

// FUNCTIONS TO RETRIEVE A RANDOM INDEX FROM AN ARRAY & TO PICK A RANDOM SQUARE INDEX
function randomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
}

function randomSquare() {
    let randomIndex = Math.floor(Math.random() * squares.length);
    return squares[randomIndex];
}

// FUNCTION TO GENERATE RANDOM "TREASURE" SQUARES FOR TREASURE HUNT
function generateRandomTreasure() {
    for (let square of squares) {
        square.classList.remove("treasure");
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

// FUNCTION TO GENERATE A RANDOM SECRET WORD FROM VALID WORDS LIST
function generateSecretWord() {
    let randomWord = randomIndex(validWords);
    return validWords[randomWord];
}

let secretWord = generateSecretWord();
let lettersOfWord = secretWord.split("")
console.log(secretWord);

// FUNCTION FOR BACKSPACE KEY TO CLEAR LETTERS, LIMITED TO THE CURRENT ROW
function backspace(event) {
    event.stopPropagation();
    
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

// FUNCTION TO RETRIEVE USER WORD GUESS FOR EACH ROW
function getUserSelection(row) {
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

/* FUNCTION TO GET USER WORD SELECTION FROM INPUTTED LETTERS, COMPARES USER SELECTION AGAINST VALID WORDS  LIST 
AND SECRET WORD */
function enter() {
    if (i === 5) {
        let chosenWord = getUserSelection(rowNum);
        
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

// FUNCTION TO HANDLE KEYBOARD KEY PRESSES (USER LETTER SELECTION)
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

// FUNCTION TO GENERATE A NEW WORD TO REPLACE PREVIOUS WORD
function newWord() {
    secretWord = generateSecretWord();
    console.log(secretWord);
    lettersOfWord = secretWord.split("");
}

// FUNCTION TO RESET GLOBAL COUNTERS
function resetCounters() {
    lettersGiven = [];
    rowNum = 1;
    i = 0;
    hintsUsed = 0;
    y = 0;
    attempts = 0;
}

// FUNCTION THAT RESETS KEYBOARD KEYS TO DEFAULT STYLING
function resetKeysDefault() {
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

// FUNCTION TO RESET COUNTERS, GENERATE A NEW WORD & RESET KEYBOARD KEYS TO DEFAULT STYLING ALL AT ONCE
function reset() {
    resetCounters();
    newWord();
    resetKeysDefault();
    resultMsg.textContent = "Guess the word!";
}

// FUNCTION TO CHANGE PAGE TO TREASURE HUNT GAME-MODE WHERE USERS CAN PLAY FOR WORDLE HINTS
function generateTreasure() {
    resetCounters();
    resetKeysDefault();
    if (hints > 0) {
        hintsMsg.textContent = `Hints remaining: ${hints}`;
        hintsMsg.style.display = "block";
    }
    wordleBtn.classList.toggle("hidden");
    hintsBtn.classList.toggle("hidden");
    treasureBtn.classList.toggle("hidden");
    treasureResetBtn.classList.toggle("hidden");
    resultMsg.textContent = "Find the treasure! You have 6 guesses.";
    for (let square of squares) {
        square.removeEventListener("click", userGuess);
        square.removeEventListener("click", playSquareSound);
        square.addEventListener("click", userGuess);
        square.addEventListener("click", playSquareSound);
    }
    for (let key of keyboardKey) {
        key.removeEventListener("click", keyPress);
        key.removeEventListener("click", playKeySound);
    }
    generateRandomTreasure();
}

// FUNCTION TO HANDLE USER GUESSES FOR TREASURE HUNT
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

// FUNCTION TO RESET PAGE BACK TO WORDLE MODE
function wordleMode() {
    wordleBtn.classList.toggle("hidden");
    hintsBtn.classList.toggle("hidden");
    treasureBtn.classList.toggle("hidden");
    treasureResetBtn.classList.toggle("hidden");
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

// FUNCTIONS TO GENERATE A RANDOM LETTER FROM SECRET WORD AND DISPLAY IT TO USER WHEN A HINT IS USED
function randomHint() {
    return Math.floor(Math.random() * lettersOfWord.length);
}

let latestHint = ""
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


// AUDIO FUNCTIONS FOR KEYS & BUTTONS
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

