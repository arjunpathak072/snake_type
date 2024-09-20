let wordsList = [];
let letterIndex = 1;
let currentLetter = '';
let lastSpaceIndex = 0;
let spaceIndices = [0];
let delta = -4;
let firstLineOffset;
let thirdLineOffset;
let timer;
let timeLeft = 15;
let isTyping = false;
let rightCharsTyped = 0;
let totalCharsTyped = 0;
let lettersShown = true;

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
    renderTimer(timeLeft);
    let allLetterElements = document.getElementsByTagName("letter");
    initLineOffsets(allLetterElements[letterIndex]);
}

function renderTimer(timeLeft) {
    document.getElementById("timeInfo").innerText = timeLeft;
}

function initLineOffsets(firstLetter) {
    firstLineOffset = Math.ceil(firstLetter.getBoundingClientRect().top);
    thirdLineOffset = firstLineOffset + convertRemToPixels(8);
    firstLetter.classList.add("active");
}

function handlePrintableCharacter(typedCharacter) {
    let lettersElement = document.getElementById("letters");
    let allLetterElements = lettersElement.querySelectorAll("letter");
    allLetterElements[letterIndex].classList.remove("active");

    if (letterIndex < allLetterElements.length - 1) {
        totalCharsTyped++;
        if (!isTyping) {
            isTyping = true;
            timer = setInterval(initTimer, 1000);
        }
        if (allLetterElements[letterIndex].innerText == typedCharacter) {
            allLetterElements[letterIndex].classList.add("correct");
            rightCharsTyped++;
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

        if (Math.ceil(allLetterElements[letterIndex].getBoundingClientRect().top) == thirdLineOffset) {
            lettersElement.style.transform = `translate(0, ${delta}rem)`;
            delta -= 4;
        }
    } else {
        calculateResults();
        hideLetters();
        hideTimeInfo();
        showResults();
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
                if (allLetterElements[i].classList.contains("correct")) {
                    rightCharsTyped--;
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
            if (allLetterElements[letterIndex].classList.contains("correct")) {
                rightCharsTyped--;
            }
            allLetterElements[letterIndex].classList.remove("correct");
            allLetterElements[letterIndex].classList.remove("incorrect");

            if (letterIndex < spaceIndices[lastSpaceIndex] && lastSpaceIndex > 0) {
                lastSpaceIndex--;
            }
            totalCharsTyped--;
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
    timeLeft = 15;
    delta = -4;
    isTyping = false;
    totalCharsTyped = 0;
    rightCharsTyped = 0;
    lettersShown = true;
    clearInterval(timer);
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("timeInfo").innerText = timeLeft;
    } else {
        calculateResults();
        hideLetters();
        hideTimeInfo();
        showResults();
        clearInterval(timer);
        lettersShown = false;
    }
}

function calculateResults() {
    let normalizedTime = 15 / 60;
    let wpm = Math.round((rightCharsTyped / 5) / normalizedTime);
    let rwpm = Math.round((totalCharsTyped / 5) / normalizedTime);
    let accuracy = Math.round((rightCharsTyped / totalCharsTyped) * 100);

    document.getElementById("wpm").innerText = wpm;
    document.getElementById("rwpm").innerText = rwpm;
    document.getElementById("accuracy").innerText = accuracy;
    document.getElementById("timeTaken").innerText = 15;
    document.getElementById("charsTyped").innerText = totalCharsTyped;
}

function showResults() {
    document.getElementById("testResults").style.display = "grid";
}

function hideResults() {
    document.getElementById("testResults").style.display = "none";
}

function hideLetters() {
    document.getElementById("letters").style.display = "none";
}

function showLetters() {
    document.getElementById("letters").style.display = "block";
}

function showTimeInfo() {
    document.getElementById("timeInfo").style.display = "block";
}

function hideTimeInfo() {
    document.getElementById("timeInfo").style.display = "none";
}

function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

document.addEventListener("keydown", (event) => {
    if (lettersShown) {
        switch (event.code) {
            case "Enter":
                resetTest();
                initWordsList();
                renderWords();
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
    } else if (event.code == "Enter") {
        hideResults();
        showLetters();
        showTimeInfo();
        resetTest();
        initWordsList();
        renderWords();
    }
});

document.addEventListener("mousedown", handler, true);
function handler(e) {
    e.stopPropagation();
    e.preventDefault();
}

initWordsList();
renderWords();