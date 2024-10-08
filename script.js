var shouldShuffle = false;
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
  const middlePart =
    wordLen > 2 ? word.slice(start, -1).split("") : word.slice(start).split("");

  // Shuffle the middle part
  for (let i = middlePart.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [middlePart[i], middlePart[j]] = [middlePart[j], middlePart[i]];
  }

  let shuffledWord;
  if (wordLen > 2) {
    shuffledWord =
      word[0] +
      middlePart.slice(0, numLettersToShuffle).join("") +
      middlePart.slice(numLettersToShuffle).join("") +
      word[wordLen - 1];
  } else {
    shuffledWord = word[0] + middlePart.join("");
  }

  return shuffledWord;
}

async function onStart() {
  shouldShuffle = true;
  while (shouldShuffle) {
    var word = document.getElementById("textToShuffle").value;
    var percentage = document.getElementById("percentage").value;
    var words = word.split(" ");
    var shuffledWords = [];
    words.forEach((word) => {
      shuffledWords.push(shuffleWord(word, percentage));
    });
    console.log(shuffledWords);
    document.getElementById("shuffledText").innerHTML = shuffledWords.join(" ");
    await sleep(600);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function onStop() {
  shouldShuffle = false;
}
