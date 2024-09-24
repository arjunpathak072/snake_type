function handlePrintableCharacter(typedCharacter) {
    const lettersElement = document.getElementById("letters");
    const allLetterElements = lettersElement.querySelectorAll("letter");

    const letterIndex = state.getLetterIndex();
    const spaceIndices = state.getSpaceIndices();
    allLetterElements[letterIndex].classList.remove("active");
    
    if (letterIndex < allLetterElements.length - 1) {
        state.incrementTotalCharsTyped();

        if (!state.getIsTyping()) {
            state.toggleIsTyping();
            state.setTimerId(setInterval(timerCallback, 1000));
        }

        if (allLetterElements[letterIndex].innerText == typedCharacter) {
            allLetterElements[letterIndex].classList.add("correct");
            state.incrementRightCharsTyped();
        } else if (allLetterElements[letterIndex].innerText == ' ') {
            const extraLetter = document.createElement("extraLetter");
            extraLetter.innerText = typedCharacter;
            extraLetter.classList.add("incorrect");

            allLetterElements[letterIndex].insertAdjacentElement("beforebegin", extraLetter);
            allLetterElements[letterIndex].classList.add("active");
            return;
        } else {
            allLetterElements[letterIndex].classList.add("incorrect");
        }

        if (letterIndex > spaceIndices[state.getLastSpaceIndex() + 1]) {
            state.incrementLastSpaceIndex();
        }
        
        state.incrementLetterIndex();
        allLetterElements[state.getLetterIndex()].classList.add("active");

        if (Math.ceil(allLetterElements[state.getLetterIndex()].getBoundingClientRect().top) == state.getThirdLineOffset) {
            lettersElement.style.transform = `translate(0, ${delta}rem)`;
            state.decrementDelta(4);
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
    const lettersElement = document.getElementById("letters");
    const allLetterElements = lettersElement.querySelectorAll("letter");
    
    const lastSpaceIndex = state.getLastSpaceIndex();
    const spaceIndices = state.getSpaceIndices();
    let letterIndex = state.getLetterIndex();
    
    allLetterElements[letterIndex].classList.remove("active");
    if (event.ctrlKey) {
        if (lastSpaceIndex >= 0) {
            for (let i = letterIndex; i > spaceIndices[lastSpaceIndex]; i--) {
                while (allLetterElements[i].previousElementSibling.tagName == "EXTRALETTER") {
                    allLetterElements[i].previousElementSibling.remove();
                }
                if (allLetterElements[i].classList.contains("correct")) {
                    state.decrementRightCharsTyped();
                }
                allLetterElements[i].classList.remove("correct");
                allLetterElements[i].classList.remove("incorrect");
            }
            state.setLetterIndex(spaceIndices[lastSpaceIndex] + 1);
            state.decrementLastSpaceIndex();
        }
    } else {
        if ((letterIndex = state.getLetterIndex()) > 1) {
            if (allLetterElements[letterIndex].previousElementSibling.tagName == "EXTRALETTER") {
                allLetterElements[letterIndex].previousElementSibling.remove();
                allLetterElements[letterIndex].classList.add("active");
                return;
            }
            letterIndex--;
            if (allLetterElements[letterIndex].classList.contains("correct")) {
                state.decrementRightCharsTyped();
            }
            allLetterElements[letterIndex].classList.remove("correct");
            allLetterElements[letterIndex].classList.remove("incorrect");

            if (letterIndex < spaceIndices[state.getLastSpaceIndex()]) {
                state.decrementLastSpaceIndex();
            }
            state.setLetterIndex(letterIndex);
        }
    }
    allLetterElements[state.getLetterIndex()].classList.add("active");
}

function handleCommands(command) {
    console.log(command);
    const setTimeoutRegex = /set timeout [0-9]*$/;
    const showHistoryRegex = /show history/
    
    if (command.match(showHistoryRegex).length > 0) {
        window.location.href = "history.html";
    } else if (command.mathc(setTimeoutRegex).length > 0) {
        console.log("set timeout command detected");
    }
}