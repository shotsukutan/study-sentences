let sentences = [];
let index = 0;
let showAnswerFlag = false;


fetch("sentences.json")
  .then(res => res.json())
  .then(data => {
    sentences = data;

    // 最初もランダムにする
    index = Math.floor(Math.random() * sentences.length);

    showWord();
  });

function showWord() {
  if (sentences.length === 0) return;

  const sentence = sentences[index];

  let text = sentence.ja;

  if (showAnswerFlag) {
    // 改行して表示
    text += "<br>" + sentence.en;
  }

  document.getElementById("sentence").innerHTML = text;
}


let order = [];
let current = 0;

function shuffle() {
  order = [...Array(sentences.length).keys()];
  order.sort(() => Math.random() - 0.5);
  current = 0;
}

function nextWord() {
  if (order.length === 0) shuffle();

  index = order[current];
  current++;

  if (current >= order.length) {
    shuffle();
  }

  showAnswerFlag = false;
  document.getElementById("answerBtn").style.visibility = "visible";

  showWord();
}

function showAnswer() {
  showAnswerFlag = true;

  // ボタンを「見えなくする（スペースは残る）」
  document.getElementById("answerBtn").style.visibility = "hidden";

  showWord();
}