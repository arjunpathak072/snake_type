let wordsList = [];
let letterIndex = 0;
let isTyping = false;
let wordIndex = 0;
let currentLetter = '';

/**
 * @brief this function is used to initialize the wordsList array
 * with a random selection of words from the data.js file.
 */
function initWords() {
    wordsList = [];
    for (let i = 0; i < 100; i++) {
        randomWord = allWords[Math.floor(Math.random() * allWords.length)];
        wordsList.push(randomWord);
    }
}

/**
 * @brief Takes the random selection of words out of the wordsList array
 * and creates a new DOM element for each letter. The tag name for such
 * an element is also "letter"
 */
function showWords() {
    let lettersElement = document.getElementById("letters");

    for (let i = 0; i < wordsList.length; i++) {
        for (let j = 0; j < wordsList[i].length; j++) {
            let letter = document.createElement("letter");
            letter.innerText = wordsList[i][j];
            lettersElement.append(letter);
        }
        let space = document.createElement("letter");
        space.innerText = " ";
        lettersElement.append(space);
    }
    lettersElement.querySelectorAll("letter")[0].classList.add("active");
}

function handlePrintable() {
    let lettersElement = document.getElementById("letters");
    let allLetterElements = lettersElement.querySelectorAll("letter");

    let inputField = document.getElementById("inputField");
    let typedCharacter = inputField.value.charAt(letterIndex);

    if (letterIndex < allLetterElements.length - 1) {
        if (!isTyping) {
            isTyping = true;
        }
        if (allLetterElements[letterIndex].innerText == typedCharacter) {
            allLetterElements[letterIndex].classList.add("correct");
        } else {
            allLetterElements[letterIndex].classList.add("incorrect");
        }
        letterIndex++;

        allLetterElements.forEach(letter => letter.classList.remove("active"));
        allLetterElements[letterIndex].classList.add("active");
    } else {
        reset();
    }
}

function handleBackspace(event) {
    let inputField = document.getElementById("inputField");
    let lettersElement = document.getElementById("letters");
    let allLetterElements = lettersElement.querySelectorAll("letter");

    if (event.ctrlKey) {
        let newPosition = inputField.value.lastIndexOf(' ') + 1;
        for (let i = letterIndex; i >= newPosition; i--) {
            allLetterElements[i].classList.remove("correct");
            allLetterElements[i].classList.remove("incorrect");
        }
        letterIndex = newPosition;
    } else {
        if (letterIndex > 0) {
            letterIndex--
            allLetterElements[letterIndex].classList.remove("correct");
            allLetterElements[letterIndex].classList.remove("incorrect");
        }
    }
    allLetterElements.forEach(letter => letter.classList.remove("active"));
    allLetterElements[letterIndex].classList.add("active");
}

function reset() {
    document.getElementById("letters").innerHTML = "";
    document.getElementById("inputField").value = "";
    initWords();
    showWords();
}

document.getElementById("inputField").addEventListener("keyup", (event) => {
    switch (event.code) {
        case "Enter":
            console.log("handling enter key")
            reset();
            break;

        case `Key${event.key.toUpperCase()}`:
        case "Space":
            if (!event.altKey && !event.ctrlKey) {
                console.log("handling printable character");
                handlePrintable();
            }
            break;

        case "Backspace":
            console.log("handling backspace key");
            handleBackspace(event);
            break;
    }
});

/**
 * @brief Disbale all click evenets globally for the DOM
 */
document.addEventListener("mousedown", handler, true);
function handler(e) {
    e.stopPropagation();
    e.preventDefault();
}

initWords();
showWords();