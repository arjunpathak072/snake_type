let wordsList = [];
let letterIndex = 0;
let isTyping = false;
let wordIndex = 0;

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


function typing(event) {
    if (event.code == `Key${event.key.toUpperCase()}`) {
        if (letterIndex < allLetterElements.length - 1) {
            if (!isTyping) {
                isTyping = true;
            }
            if (typedCharacter == " ") {
                if (inputField.value.length > wordsList[wordIndex]) {
                    
                }
                wordIndex++;
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
            document.getElementById("inputField").value = "";
        }
    } else if (event.code == "Backspace") {
        if (event.ctrlKey) {
            // handle the deletion of words
        } else {
            // handle the deletion of a single letter
        }
    }
    let lettersElement = document.getElementById("letters");
    let inputField = document.getElementById("inputField");
    let allLetterElements = lettersElement.querySelectorAll("letter");
    let typedCharacter = inputField.value.split("")[letterIndex];
    console.log(typedCharacter);

}


function reset() {
    document.getElementById("letters").innerHTML = "";
    document.getElementById("inputField").value = "";
    initWords();
    showWords();
}

initWords();
showWords();

document.getElementById("inputField").addEventListener("keydown", (event) => {
    switch (event.key) {
        case "Enter":
            reset();
            break;
        default:
            typing(event);
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