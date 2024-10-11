let shouldShuffle = false;

window.onload = function load() {
  const speedSlider = document.getElementById("speedValue");
  speedSlider.addEventListener("input", function () {
    document.getElementById("speedLabel").innerHTML =
      "Speed = " + speedSlider.value + "ms";
  });
  speedSlider.value = 200;
  speedSlider.dispatchEvent(new Event("input"));
};

function shuffleWord(word, percentage) {
  const wordLen = word.length;
  const numLettersToShuffle = Math.max(
    1,
    Math.floor(wordLen * (percentage / 100))
  );

  if (wordLen <= 1 || numLettersToShuffle <= 1) {
    return word; // No need to shuffle words of length 1 or less
  }

  const start = wordLen > 2 ? 1 : 0;
  const middlePart = word.slice(start, -1).split("");

  // Shuffle the middle part
  for (let i = middlePart.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [middlePart[i], middlePart[j]] = [middlePart[j], middlePart[i]];
  }

  const shuffledWord =
    wordLen > 2
      ? word[0] +
        middlePart.slice(0, numLettersToShuffle).join("") +
        middlePart.slice(numLettersToShuffle).join("") +
        word[wordLen - 1]
      : word[0] + middlePart.join("");

  return shuffledWord;
}

async function onStart() {
  shouldShuffle = true;
  while (shouldShuffle) {
    const word = document.getElementById("textToShuffle").value;
    const percentage = parseInt(
      document.getElementById("percentage").value,
      10
    );

    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      console.error("Invalid percentage value");
      return;
    }

    const words = word.split(" ");
    const shuffledWords = words.map((word) => shuffleWord(word, percentage));

    document.getElementById("shuffledText").innerHTML = shuffledWords.join(" ");
    const speedSlider = document.getElementById("speedValue");
    var speed = speedSlider.value;
    await sleep(speed);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function onStop() {
  shouldShuffle = false;
}
