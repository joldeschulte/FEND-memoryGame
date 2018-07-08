let moveCounter = 0;
let openCards = [];
let allStars = document.getElementsByClassName("stars"); // [0] modal; [1] score-panel
let started = false; //for timer
let timerInterval = 0;
const modal = document.getElementById('winModal');

start();

function start() {
  started = false;
  let cards = document.getElementsByClassName("deck")[0].getElementsByTagName("li");
  for (let i=0; i < cards.length; i++) {
    cards[i].className = "card";
  };

  let cardShapes = document.getElementsByClassName("deck")[0].getElementsByTagName("i");
  let cardClassShapeArr = [];
  for (let i=0; i < cardShapes.length; i++) {
    cardClassShapeArr.push(cardShapes[i].className.split(" ")[1]);
  };

  cardClassShapeArr = shuffle(cardClassShapeArr);

  for (let i=0; i < cardShapes.length; i++) {
    cardShapes[i].className = "fa " + cardClassShapeArr[i];
  };

  for (let i=0; i < cards.length; i++) {
    cards[i].addEventListener("click", displayCard);
  };

  document.getElementsByClassName("fa-repeat")[0].addEventListener("click", reset);
  document.getElementsByClassName("fa-repeat")[1].addEventListener("click", reset);

  for (let i=0; i<allStars.length; i++) {
    for (let j=0; j<allStars[i].children.length; j++) {
      allStars[i].children[j].children[0].className = "fa fa-star";
    }
  };
  window.clearInterval(timerInterval);
  document.getElementById("timer").innerHTML = " in 0 seconds";
};

function reset() {
  let cards = document.getElementsByClassName("deck")[0].getElementsByTagName("li")
  for (let i=0; i < cards.length; i++) {
    cards[i].className = "blank-card";
  };

  moveCounter = 0;
  openCards = [];

  setTimeout(start, 0);
  keepScore();

  document.getElementById("plural").innerText = "Moves";
  modal.style.display = "none";
};

function cardsMatch(cardZero, cardOne) {
  cardZero.className = "card match";
  cardOne.className = "card match";
  const cards = document.getElementsByClassName("deck")[0].getElementsByTagName("li");
  for (let i=0; i < cards.length; i++) {
    let cardClass = cards[i].className;
    if (cardClass != "card match") {
      break;
    } else {
      if (i == cards.length-1) {
        printWinner();
      }
    }
  };
};

function cardsDoNotMatch(cardZero, cardOne) {
  cardZero.className = "card";
  setTimeout(function() {
    cardOne.className = "card";
  }, 0);
};


function keepScore() {
  let moves = document.getElementsByClassName("moves");
  moves[0].innerText = moveCounter.toString();
  moves[1].innerText = moveCounter.toString();

  if (moveCounter == 1) {
    document.getElementById("plural").innerText = "Move";
  } else if (moveCounter == 2) {
    document.getElementById("plural").innerText = "Moves";
  };

  if (moveCounter == 26) {
    allStars[0].children[2].children[0].className = "fa fa-star-half-o"
    allStars[1].children[2].children[0].className = "fa fa-star-half-o"
  }
  else if (moveCounter == 31) {
    allStars[0].children[2].children[0].className = "fa fa-star-o"
    allStars[1].children[2].children[0].className = "fa fa-star-o"
  }
  else if (moveCounter == 36) {
    allStars[0].children[1].children[0].className = "fa fa-star-half-o"
    allStars[1].children[1].children[0].className = "fa fa-star-half-o"
  }
  else if (moveCounter == 41) {
    allStars[0].children[1].children[0].className = "fa fa-star-o"
    allStars[1].children[1].children[0].className = "fa fa-star-o"
  }
  else if (moveCounter == 46) {
    allStars[0].children[0].children[0].className = "fa fa-star-half-o"
    allStars[1].children[0].children[0].className = "fa fa-star-half-o"
  }
  else if (moveCounter == 51) {
    allStars[0].children[0].children[0].className = "fa fa-star-o"
    allStars[1].children[0].children[0].className = "fa fa-star-o"
  }
}

function printWinner() {
  modal.style.display = "block"
  window.clearInterval(timerInterval)
}



function displayCard(mouseEvent) {
  let card = document.elementFromPoint(mouseEvent.x, mouseEvent.y);
  let cardClasses = card.className.split(" ");
  if (cardClasses[0] == "card") {
    if (started == false) {
      started = true;
      timeIt();
    };
    if (card.className != "card match" && card.className != "card open show") {
      moveCounter ++;
      openCards.push(card);
      card.className = "card open show";
      if (openCards.length == 2) {
        let checkZero = openCards[0].innerHTML;
        let checkOne = card.innerHTML;

        if (checkOne == checkZero) {
          cardsMatch(openCards[0], card);
        } else {
          cardsDoNotMatch(openCards[0], card);
        };
        openCards = [];
      }
      keepScore();
    }
  }
};

function timeIt() {
  let seconds = 0
  let minutes = 0
  timerInterval = setInterval(function() {
    seconds ++
    if (seconds < 60) {
      document.getElementById("timer").innerText = "in " + seconds + " seconds";
      document.getElementById("modal-timer").innerText = seconds + " seconds";
    } else if (seconds > 60 && seconds < 3600) {
      minutes = (seconds-(seconds%60))/60
      if (minutes == 1) {
        document.getElementById("timer").innerText = "in " + minutes + " minute and " + seconds%60 + " seconds";
        document.getElementById("modal-timer").innerText = minutes + " minute and " + seconds%60 + " seconds";
      } else {
        document.getElementById("timer").innerText = "in " + minutes + " minutes and " + seconds%60 + " seconds";
        document.getElementById("modal-timer").innerText = minutes + " minutes and " + seconds%60 + " seconds";
      }
    } else {
      document.getElementById("timer").innerText = "over an hour";
      document.getElementById("modal-timer").innerText = "Over one hour...";
    }
  }, 1000);
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
