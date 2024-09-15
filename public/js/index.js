let wordsDatabse = [
    "the",
    "be",
    "of",
    "and",
    "a",
    "to",
    "in",
    "he",
    "have",
    "it",
    "that",
    "for",
    "they",
    "I",
    "with",
    "as",
    "not",
    "on",
    "she",
    "at",
    "by",
    "this",
    "we",
    "you",
    "do",
    "but",
    "from",
    "or",
    "which",
    "one",
    "would",
    "all",
    "will",
    "there",
    "say",
    "who",
    "make",
    "when",
    "can",
    "more",
    "if",
    "no",
    "man",
    "out",
    "other",
    "so",
    "what",
    "time",
    "up",
    "go",
    "about",
    "than",
    "into",
    "could",
    "state",
    "only",
    "new",
    "year",
    "some",
    "take",
    "come",
    "these",
    "know",
    "see",
    "use",
    "get",
    "like",
    "then",
    "first",
    "any",
    "work",
    "now",
    "may",
    "such",
    "give",
    "over",
    "think",
    "most",
    "even",
    "find",
    "day",
    "also",
    "after",
    "way",
    "many",
    "must",
    "look",
    "before",
    "great",
    "back",
    "through",
    "long",
    "where",
    "much",
    "should",
    "well",
    "people",
    "down",
    "own",
    "just",
    "because",
    "good",
    "each",
    "those",
    "feel",
    "seem",
    "how",
    "high",
    "too",
    "place",
    "little",
    "world",
    "very",
    "still",
    "nation",
    "hand",
    "old",
    "life",
    "tell",
    "write",
    "become",
    "here",
    "show",
    "house",
    "both",
    "between",
    "need",
    "mean",
    "call",
    "develop",
    "under",
    "last",
    "right",
    "move",
    "thing",
    "general",
    "school",
    "never",
    "same",
    "another",
    "begin",
    "while",
    "number",
    "part",
    "turn",
    "real",
    "leave",
    "might",
    "want",
    "point",
    "form",
    "off",
    "child",
    "few",
    "small",
    "since",
    "against",
    "ask",
    "late",
    "home",
    "interest",
    "large",
    "person",
    "end",
    "open",
    "public",
    "follow",
    "during",
    "present",
    "without",
    "again",
    "hold",
    "govern",
    "around",
    "possible",
    "head",
    "consider",
    "word",
    "program",
    "problem",
    "however",
    "lead",
    "system",
    "set",
    "order",
    "eye",
    "plan",
    "run",
    "keep",
    "face",
    "fact",
    "group",
    "play",
    "stand",
    "increase",
    "early",
    "course",
    "change",
    "help",
    "line"
];

let wordsList = [];
let currentWord = 0;
let currentLetterIndex = -1;
let currentWordIndex = 0;
let inputHistory = [];
let userInput = "";

function initWords() {
    for (let i = 0; i < 100; i++) {
        randomWord = wordsDatabse[Math.floor(Math.random() * wordsDatabse.length)];
        wordsList.push(randomWord);
    }
}

function addWords() {
    let testContainer = document.getElementById("testContainer");
    console.log(testContainer);

    for (let i = 0; i < wordsList.length; i++) {
        let newWord = document.createElement("word");
        for (let j = 0; j < wordsList[i].length; j++) {
            let newLetter = document.createElement("letter");
            newLetter.innerText = wordsList[i][j];
            newWord.appendChild(newLetter);
        }
        testContainer.appendChild(newWord);
    }
}

// Caret related functions

function hideCaret() {
    document.getElementById("caret").classList.add("hidden");
}

function showCaret() {
    let caret = document.getElementById("caret");
    caret.classList.remove("hidden");
}

function moveCaret() {
    let caret = document.getElementById("caret");
    let currentWordElement = document.getElementById("testContainer").children[currentWordIndex + 1];

    caret.offsetLeft = currentWordElement.children[currentLetterIndex]
    console.log(currentWordElement.children);
}

function animateCaret() {
    let caret = document.getElementById("caret");
    caret.style.animationName = "flashingAnimation";
}

function staticCaret() {
    let caret = document.getElementById("caret");
    caret.style.animationName = "";
}

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    switch (event.key) {
        case ":":
            handleCommands();
            break;
        case " ":
            handleUserInput();
            console.log(userInput);
            userInput = "";
            break;
        default:
            if (event.which < 65 || event.which > 90) {
                return;
            }
            userInput += event.key;
            break;
    }
})

function handleCommands() { }

function handleUserInput() {

}

initWords();
console.log("initialized words successfully!");
addWords();
console.log("addes words to the DOM");
showCaret();

moveCaret();