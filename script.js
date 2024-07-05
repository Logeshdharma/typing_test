const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "The pen is mightier than the sword.",
    "Actions speak louder than words.",
    "You can't judge a book by its cover.",
    "When in Rome, do as the Romans do.",
    "The early bird catches the worm.",
    "A picture is worth a thousand words."
];

const targetTextElement = document.getElementById('target-text');
const userInput = document.getElementById('user-input');
const timeDisplay = document.getElementById('time');
const speedDisplay = document.getElementById('speed');
const accuracyDisplay = document.getElementById('accuracy');
const restartButton = document.getElementById('restart-button');

let startTime, interval;
let isRunning = false;

function getRandomSentence() {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
}

function startTest() {
    targetTextElement.textContent = getRandomSentence();
    userInput.value = '';
    timeDisplay.textContent = '0';
    speedDisplay.textContent = '0';
    accuracyDisplay.textContent = '100';
    isRunning = false;
    clearInterval(interval);
}

function stopTest() {
    clearInterval(interval);
    isRunning = false;
}

userInput.addEventListener('input', () => {
    if (!isRunning) {
        startTime = new Date();
        isRunning = true;
        interval = setInterval(updateTime, 1000);
    }
    updateResults();
    if (userInput.value === targetTextElement.textContent) {
        stopTest();
    }
});

restartButton.addEventListener('click', restartTest);

function updateTime() {
    const currentTime = new Date();
    const timeElapsed = Math.floor((currentTime - startTime) / 1000);
    timeDisplay.textContent = timeElapsed;
}

function updateResults() {
    const typedText = userInput.value;
    const timeElapsed = Math.floor((new Date() - startTime) / 1000);

    // Calculate words per minute (WPM)
    const wordsTyped = typedText.split(' ').filter(word => word.length > 0).length;
    const wpm = timeElapsed > 0 ? Math.round((wordsTyped / timeElapsed) * 60) : 0;
    speedDisplay.textContent = wpm;

    // Calculate accuracy
    const targetText = targetTextElement.textContent;
    const targetTextArray = targetText.split('');
    const typedTextArray = typedText.split('');
    let correctChars = 0;
    typedTextArray.forEach((char, index) => {
        if (char === targetTextArray[index]) {
            correctChars++;
        }
    });
    const accuracy = Math.round((correctChars / targetText.length) * 100);
    accuracyDisplay.textContent = accuracy;
}

function restartTest() {
    clearInterval(interval);
    startTest();
}

startTest();

