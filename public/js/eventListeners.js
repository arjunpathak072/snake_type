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
        renderWords();
    }
});


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


document.addEventListener("mousedown", function (event) {
    event.stopPropagation();
}, true);


window.addEventListener("resize", function(event) {
    const firstLetter = document.getElementsByTagName("letter")[1];
    initLineOffsets(firstLetter);
    console.log(firstLetter);
}, true)