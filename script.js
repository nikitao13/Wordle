// get DOM elements
const resultMsg = document.getElementById("result-msg")
const keyboardKey = document.querySelectorAll(".key")
const enterKey = document.getElementById("enter")
const backspaceKey = document.getElementById("backspace")
const backspaceImg = document.getElementById("back")
const squares = document.querySelectorAll(".display-container > div")

let rowNum = 1;
let i = 0;

// attach event listeners to buttons
for (let key of keyboardKey) {
    key.addEventListener("click", keyPress)
}
backspaceKey.addEventListener("click", backspace)
backspaceImg.addEventListener("click", backspace)
enterKey.addEventListener("click", enter)

// backspace function
function backspace() {
    if (i > 0 && rowNum === 1) {
        squares[i -1].textContent = "";
        i--;
        resultMsg.textContent = i.toString();
    }
    if (i > 0 && rowNum === 2) {
        squares[i + 5 -1].textContent = "";
        i--;
        resultMsg.textContent = i.toString();
    }
    if (i > 0 && rowNum === 3) {
        squares[i + 10 - 1].textContent = "";
        i--;
        resultMsg.textContent = i.toString();
    }
    if (i > 0 && rowNum === 4) {
        squares[i + 15 - 1].textContent = "";
        i--;
        resultMsg.textContent = i.toString();
    }
    if (i > 0 && rowNum === 5) {
        squares[i +20 - 1].textContent = "";
        i--;
        resultMsg.textContent = i.toString();
    }
    if (i > 0 && rowNum === 6) {
        squares[i + 25 - 1].textContent = "";
        i--;
        resultMsg.textContent = i.toString();
    }
    if (i < 5) { 
        enterKey.style.backgroundColor = "#EFF9FF";
        for (let key of keyboardKey) {
            key.style.backgroundColor = "#EFF9FF"
            key.style.color = "#0068AB"
            key.style.opacity = "100%";
            
        }
    }
}

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

function enter() {
    if (i === 5) {
        let chosenWord = getWord(rowNum);
        for (let key of keyboardKey) {
            key.style.backgroundColor = "#EFF9FF"
            key.style.color = "#0068AB"
            key.style.opacity = "100%";
        }
        rowNum++
        i = 0;
        resultMsg.textContent = chosenWord;
        
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
        resultMsg.textContent = i.toString();
    }
    if (i === 5) {
        enterKey.style.backgroundColor = "#D9F5A8"
        for (let key of keyboardKey) {
            if (key.id !== "backspace" && key.id !== "enter") {
                key.style.backgroundColor = "grey";
                key.style.color = "white";
                key.style.opacity = "50%";
            }
        }
    }
}


