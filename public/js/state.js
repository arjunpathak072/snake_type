const state = (function () {
    let delta = -4;
    let timerId = 0;
    let maxTime = 15;
    let timeLeft = maxTime;
    let rightCharsTyped = 0, totalCharsTyped = 0;
    let firstLineOffset = 0, thirdLineOffset = 0;
    let isTyping = false, lettersShown = true, commandMode = false;
    let wordsList = [], spaceIndices = [0];
    let letterIndex = 1, lastSpaceIndex = 0;

    /**
     * Method for timerId
     */
    const setTimerId = (value) => {
        timerId = value;
    }
    const getTimerId = () => {
        return timerId;
    }

    /**
     * Method to reset the state
     */
    const reset = () => {
        delta = -4;
        timeLeft = maxTime;
        rightCharsTyped = totalCharsTyped = 0;
        firstLineOffset = thirdLineOffset = 0;
        isTyping = false, lettersShown = true, commandMode = false;
        wordsList = [], spaceIndices = [0];
        letterIndex = 1;
        lastSpaceIndex = 0;
        clearInterval(timerId);
    }

    /**
     * Method for delta
     */
    const getDelta = () => {
        return delta;
    }
    const setDelta = (value) => {
        this.delta = value;
    }
    const decrementDelta = (value) => {
        delta -= value;
    }

    /**
     * Methods or wordsList 
     */
    const addToWordsList = (value) => {
        wordsList.push(value);
    }
    const getWordsList = () => {
        return wordsList;
    }

    /** 
     * Method for letterIndex
    */
    const incrementLetterIndex = () => {
        letterIndex++;
    }
    const decrementLetterIndex = () => {
        if (letterIndex - 1 >= 1) {
            letterIndex--;
        }
    }
    const setLetterIndex = (value) => {
        letterIndex = value;
    }
    const getLetterIndex = () => {
        return letterIndex;
    }

    /**
     * Method for lastSpaceIndex
     */
    const incrementLastSpaceIndex = () => {
        if (lastSpaceIndex + 1 < spaceIndices.length) {
            lastSpaceIndex++;
        }
    }
    const decrementLastSpaceIndex = () => {
        if (lastSpaceIndex - 1 >= 0) {
            lastSpaceIndex--;
        }
    }
    const getLastSpaceIndex = () => {
        return lastSpaceIndex;
    }
    const setLastSpaceIndex = (value) => {
        lastSpaceIndex = value;
    }

    /**
     * Methods for spaceIndices
    */
    const addToSpaceIndices = (value) => {
        spaceIndices.push(value);
    }
    const getSpaceIndices = () => {
        return spaceIndices;
    }

    /**
     * Methods for firstLineOffset 
     */
    const setFirstLineOffset = (value) => {
        firstLineOffset = value;
    }
    const getFirstLineOffset = (value) => {
        return firstLineOffset;
    }

    /**
     * Methods for thirdLineOffset
     */
    const setThirdLineOffset = (value) => {
        thirdLineOffset = value;
    }
    const getThirdLineOffset = (value) => {
        return thirdLineOffset;
    }

    /**
     * Methods for maxTime 
     */
    const setMaxTime = (value) => {
        maxTime = value;
    }
    const getMaxTime = () => {
        return maxTime;
    }

    /**
     * Methods for timeLeft
     */
    const decrementTimeLeft = () => {
        if (timeLeft > 0) {
            timeLeft--;
            return true
        } else {
            return false;
        }
    }
    const getTimeLeft = () => {
        return timeLeft;
    }

    /**
     * Methods for right chars typed
     */
    const getRightCharsTyped = () => {
        return rightCharsTyped;
    }
    const incrementRightCharsTyped = () => {
        rightCharsTyped++;
    }
    const decrementRightCharsTyped = () => {
        rightCharsTyped--;
    }

    /**
     * Methods for totalCharsTyped
     */
    const getTotalCharsTyped = () => {
        return totalCharsTyped;
    }
    const incrementTotalCharsTyped = () => {
        totalCharsTyped++;
    }

    /**
     * Methods for isTyping
     */
    const toggleIsTyping = () => {
        isTyping = !isTyping;
    }
    const getIsTyping = () => {
        return isTyping;
    }

    /**
     * Methods for lettersShown
     */
    const getLettersShown = () => {
        return lettersShown;
    }
    const toggleLettersShown = () => {
        lettersShown = !lettersShown;
    }

    /**
     * Methods for commandMode
     */
    const toggleCommandMode = () => {
        commandMode = !commandMode;
    }
    const getCommandMode = () => {
        return commandMode;
    }

    return {
        reset,

        getDelta,
        setDelta,
        decrementDelta,

        addToWordsList,
        getWordsList,

        getLetterIndex,
        setLetterIndex,
        incrementLetterIndex,
        decrementLetterIndex,

        incrementLastSpaceIndex,
        decrementLastSpaceIndex,
        getLastSpaceIndex,
        setLastSpaceIndex,

        addToSpaceIndices,
        getSpaceIndices,

        setFirstLineOffset,
        getFirstLineOffset,

        setThirdLineOffset,
        getThirdLineOffset,

        setMaxTime,
        getMaxTime,

        decrementTimeLeft,
        getTimeLeft,

        getRightCharsTyped,
        incrementRightCharsTyped,
        decrementRightCharsTyped,
        
        getTotalCharsTyped,
        incrementTotalCharsTyped,

        toggleIsTyping,
        getIsTyping,

        getLettersShown,
        toggleLettersShown,

        toggleCommandMode,
        getCommandMode,
        
        getTimerId,
        setTimerId,
    };
})();