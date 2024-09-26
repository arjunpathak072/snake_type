function fetchResults() {
    const historyArray = JSON.parse(localStorage.getItem("history"));
    return historyArray;
}

function renderHistory(historyArray) {
    historyArray.forEach(element => {
        const row = document.createElement("tr");
        
        const wpm = document.createElement("td");
        const rwpm = document.createElement("td");
        const accuracy = document.createElement("td");
        const maxTime = document.createElement("td");
        const chars = document.createElement("td");

        wpm.innerText = element.wpm;
        rwpm.innerText = element.rwpm;
        accuracy.innerText = element.accuracy;
        maxTime.innerText = element.maxTime;
        chars.innerText = element.totalCharsTyped;

        row.append(wpm, rwpm, accuracy, maxTime, chars);
        document.getElementById("historyTable").getElementsByTagName("tbody")[0].append(row);
    });
}

renderHistory(fetchResults());