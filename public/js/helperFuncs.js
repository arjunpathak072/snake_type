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