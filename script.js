window.onload = function load() {
  const speedSlider = document.getElementById("speedValue");
  if (speedSlider) {
    speedSlider.addEventListener("input", function () {
      const speedLabel = document.getElementById("speedLabel");
      if (speedLabel) {
        speedLabel.textContent = `Speed = ${speedSlider.value}ms`;
      }
    });
    speedSlider.value = 200;
    speedSlider.dispatchEvent(new Event("input"));
  }
  //read sample_text.txt and set it to textToShuffle
  fetch("sample_text.txt")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("textToShuffle").value = data;
    });
  onStart();
};

function shuffleWord(word, percentage) {
  const wordLen = word.length;
  if (wordLen <= 1) return word;

  const numLettersToShuffle = Math.max(
    1,
    Math.floor(wordLen * (percentage / 100))
  );
  if (numLettersToShuffle <= 1) return word;

  const middlePart = word.slice(1, -1).split("");
  for (let i = middlePart.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [middlePart[i], middlePart[j]] = [middlePart[j], middlePart[i]];
  }

  return word[0] + middlePart.join("") + word[wordLen - 1];
}

async function onStart() {
  while (true) {
    const textToShuffle = document.getElementById("textToShuffle");
    const percentageInput = document.getElementById("percentage");
    const shuffledText = document.getElementById("shuffledText");
    const speedSlider = document.getElementById("speedValue");

    if (!textToShuffle || !percentageInput || !shuffledText || !speedSlider) {
      console.error("Required DOM elements not found");
      return;
    }

    const text = textToShuffle.value;
    const percentage = parseInt(percentageInput.value, 10);

    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      console.error("Invalid percentage value");
      return;
    }

    const lines = text.split("\n");
    const shuffledLines = lines.map((line) => {
      const words = line.split(" ");
      const shuffledWords = words.map((word) => shuffleWord(word, percentage));
      return shuffledWords.join(" ");
    });

    shuffledText.innerHTML = shuffledLines.join("<br>");
    console.log(this);
    await sleep(speedSlider.value);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
