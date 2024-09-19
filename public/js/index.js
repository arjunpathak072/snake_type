let wordsList = [];
let letterIndex = 1;
let currentLetter = '';
let lastSpaceIndex = 0;
let spaceIndices = [0];
let delta = -64;

function initWordsList() {
    for (let i = 0; i < 100; i++) {
        randomWord = allWords[Math.floor(Math.random() * allWords.length)];
        wordsList.push(randomWord);
    }
}

function renderWords() {
    let lettersElement = document.getElementById("letters");
    let blankSpace = document.createElement("letter");
    blankSpace.innerText = " ";
    blankSpace.style.display = "none";
    lettersElement.append(blankSpace);
    let idx = 1;

    for (let i = 0; i < wordsList.length; i++) {
        for (let j = 0; j < wordsList[i].length; j++) {
            let letter = document.createElement("letter");
            letter.innerText = wordsList[i][j];
            lettersElement.append(letter);
            idx++;
        }
        let space = document.createElement("letter");
        space.innerText = " ";
        lettersElement.append(space);

        spaceIndices.push(idx);
        idx++
    }
    lettersElement.querySelectorAll("letter")[1].classList.add("active");
}

function handlePrintableCharacter(typedCharacter) {
    let lettersElement = document.getElementById("letters");
    let allLetterElements = lettersElement.querySelectorAll("letter");
    allLetterElements[letterIndex].classList.remove("active");

    if (letterIndex < allLetterElements.length - 1) {
        if (allLetterElements[letterIndex].innerText == typedCharacter) {
            allLetterElements[letterIndex].classList.add("correct");
        } else if (allLetterElements[letterIndex].innerText == ' ') {
            let extraLetter = document.createElement("extraLetter");
            extraLetter.innerText = typedCharacter;
            extraLetter.classList.add("incorrect");
            allLetterElements[letterIndex].insertAdjacentElement("beforebegin", extraLetter);
            allLetterElements[letterIndex].classList.add("active");
            return;
        } else {
            allLetterElements[letterIndex].classList.add("incorrect");
        }
        if (lastSpaceIndex + 1 < spaceIndices.length && letterIndex > spaceIndices[lastSpaceIndex + 1]) {
            lastSpaceIndex++;
        }
        letterIndex++;
        allLetterElements[letterIndex].classList.add("active");
        console.log(Math.ceil(allLetterElements[letterIndex].getBoundingClientRect().top));
        if (Math.ceil(allLetterElements[letterIndex].getBoundingClientRect().top) == 192) {
            lettersElement.style.transform = `translate(0, ${delta}px)`;
            delta -= 64;
        }
    } else {
        resetTest();
    }
}

function handleBackspace(event) {
    let lettersElement = document.getElementById("letters");
    let allLetterElements = lettersElement.querySelectorAll("letter");
    allLetterElements[letterIndex].classList.remove("active");

    if (event.ctrlKey) {
        if (lastSpaceIndex >= 0) {
            for (let i = letterIndex; i > spaceIndices[lastSpaceIndex]; i--) {
                while (allLetterElements[i].previousElementSibling.tagName == "EXTRALETTER") {
                    allLetterElements[i].previousElementSibling.remove();
                }
                allLetterElements[i].classList.remove("correct");
                allLetterElements[i].classList.remove("incorrect");
            }
            letterIndex = spaceIndices[lastSpaceIndex] + 1;
            lastSpaceIndex--;
        }
    } else {
        if (letterIndex > 1) {
            if (allLetterElements[letterIndex].previousElementSibling.tagName == "EXTRALETTER") {
                allLetterElements[letterIndex].previousElementSibling.remove();
                allLetterElements[letterIndex].classList.add("active");
                return;
            }
            letterIndex--
            allLetterElements[letterIndex].classList.remove("correct");
            allLetterElements[letterIndex].classList.remove("incorrect");

            if (letterIndex < spaceIndices[lastSpaceIndex] && lastSpaceIndex > 0) {
                lastSpaceIndex--;
            }
        }
    }
    allLetterElements[letterIndex].classList.add("active");
}

function resetTest() {
    document.getElementById("letters").innerHTML = "";
    letterIndex = 1;
    lastSpaceIndex = 0;
    wordsList = [];
    spaceIndices = [0];
    delta = 1 * document.getElementsByTagName("letter").clientHeight;
    initWordsList();
    renderWords();
}

document.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "Enter":
            resetTest();
            break;

        case `Key${event.key.toUpperCase()}`:
        case "Space":
            if (!event.altKey && !event.ctrlKey) {
                handlePrintableCharacter(event.key);
            }
            break;

        case "Backspace":
            handleBackspace(event);
            break;
    }
});

document.addEventListener("mousedown", handler, true);
function handler(e) {
    e.stopPropagation();
    e.preventDefault();
}

initWordsList();
renderWords();