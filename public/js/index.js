function initWordsList() {
    for (let i = 0; i < 100; i++) {
        randomWord = allWords[Math.floor(Math.random() * allWords.length)];
        state.addToWordsList(randomWord);
    }
}

function renderWords() {
    const lettersElement = document.getElementById("letters");
    const spaceElement = document.createElement("letter");
    let idx = 1;

    spaceElement.innerText = " ";
    spaceElement.style.display = "none";
    lettersElement.append(spaceElement);

    state.getWordsList().forEach(word => {
        word.split("").forEach(letter => {
            const newLetterElement = document.createElement("letter");
            newLetterElement.innerText = letter;
            lettersElement.append(newLetterElement);
            idx++;
        })
        const spaceElement = document.createElement("letter");
        spaceElement.innerText = " ";
        lettersElement.append(spaceElement);

        state.addToSpaceIndices(idx++);
    });

    document.getElementById("timeInfo").innerText = state.getMaxTime();
    const allLetterElements = document.getElementsByTagName("letter");
    const firstLetter = allLetterElements[state.getLetterIndex()];
    firstLetter.classList.add("active");
    initLineOffsets(firstLetter);
}

function initLineOffsets(firstLetter) {
    const firstLineOffset = Math.ceil(firstLetter.getBoundingClientRect().top);
    const thirdLineOffset = firstLineOffset + convertRemToPixels(8);
    state.setFirstLineOffset(firstLineOffset);
    state.setThirdLineOffset(thirdLineOffset);
}

function timerCallback() {
    if (!state.decrementTimeLeft()) {
        hideLetters();
        hideTimeInfo();

        const result = calculateResults()
        renderResults(result);
        saveResults(result);

        showResults();
        clearInterval(state.getTimerId());
        state.toggleLettersShown();
    } else {
        document.getElementById("timeInfo").innerText = state.getTimeLeft();
    }
}

function calculateResults() {
    const rightCharsTyped = state.getRightCharsTyped();
    const totalCharsTyped = state.getTotalCharsTyped();
    const maxTime = state.getMaxTime();

    const normalizedTime = maxTime / 60;
    const wpm = Math.round((rightCharsTyped / 5) / normalizedTime);
    const rwpm = Math.round((totalCharsTyped / 5) / normalizedTime);
    const accuracy = Math.round((rightCharsTyped / totalCharsTyped) * 100);

    console.log(rightCharsTyped, totalCharsTyped);
    return {
        wpm : wpm,
        rwpm : rwpm,
        accuracy : accuracy,
        maxTime : maxTime,
        totalCharsTyped : totalCharsTyped,
    }
}

function renderResults(result) {
    console.log(result);
    document.getElementById("wpm").innerText = result.wpm;
    document.getElementById("rwpm").innerText = result.rwpm;
    document.getElementById("accuracy").innerText = result.accuracy;
    document.getElementById("maxTime").innerText = result.maxTime;
    document.getElementById("charsTyped").innerText = result.totalCharsTyped;
}

function saveResults(result) {
    if (localStorage.getItem("history") == null) {
        localStorage.setItem("history", "[]");
    }
    const history = localStorage.getItem("history");
    const historyArray = JSON.parse(history);

    historyArray.push(result);
    localStorage.setItem("history", JSON.stringify(historyArray));
}

document.getElementById("statusLine").addEventListener("keydown", (event) => {
    switch (event.code) {
        case "Escape":
            document.getElementById("statusLine").value = "";
            document.getElementById("statusLine").blur();
            state.toggleCommandMode();
            break;
        case "Enter":
            handleCommands(document.getElementById("statusLine").value);
            document.getElementById("statusLine").blur();
            document.getElementById("statusLine").value = "";
            state.toggleCommandMode();
            break;
    }
})

document.addEventListener("keydown", (event) => {
    if (state.getLettersShown() && !state.getCommandMode()) {
        switch (event.code) {
            case "Enter":
                state.reset();
                document.getElementById("letters").innerHTML = "";
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
            case "Semicolon":
                event.preventDefault();
                document.getElementById("statusLine").focus();
                state.toggleCommandMode();
                break;
        }
    } else if (!state.getLettersShown() && event.code == "Enter") {
        state.reset();
        document.getElementById("letters").innerHTML = "";
        hideResults();
        showLetters();
        showTimeInfo();
        initWordsList();
        renderWords(calculateResults());
    }
});

document.addEventListener("mousedown", handler, true);
function handler(e) {
    e.stopPropagation();
    e.preventDefault();
}

initWordsList();
renderWords();