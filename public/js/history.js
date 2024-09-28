function fetchResults() {
    const historyArray = JSON.parse(localStorage.getItem("history"));
    return historyArray;
}

function renderHistory(historyArray) {
    let avgWpm = 0, avgRwpm = 0, avgAcc = 0, netChars = 0;
    const len = historyArray.length

    for (i = len-1; i >= 0; i--) {
        const element = historyArray[i]
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

        avgWpm += element.wpm
        avgRwpm += element.rwpm
        avgAcc += element.accuracy
        netChars += element.totalCharsTyped
    };

    document.getElementById("avgWpm").innerText = (avgWpm / len).toFixed(2)
    document.getElementById("avgRwpm").innerText = (avgRwpm / len).toFixed(2)
    document.getElementById("avgAccuracy").innerText = (avgAcc / len).toFixed(2)
    document.getElementById("netChars").innerText = netChars
}

renderHistory(fetchResults());