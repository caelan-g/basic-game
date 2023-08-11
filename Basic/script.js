let game = document.getElementById("game");
let root = document.documentElement;
let gameTop = parseInt(
  getComputedStyle(root).getPropertyValue("--game-margin-top")
);
let gameLeft = parseInt(
  getComputedStyle(root).getPropertyValue("--game-margin-left")
);
let gameWidth = parseInt(
  getComputedStyle(root).getPropertyValue("--game-width")
);
let gameHeight = parseInt(
  getComputedStyle(root).getPropertyValue("--game-height")
);

var character = document.getElementById("character");
let characterBase = parseInt(window.getComputedStyle(character).top);
console.log(characterBase);
let characterTopBorder = 0;
let characterJump = 2;
let characterGravity = 2;
let characterTop = characterBase;
let characterWidth = parseInt(window.getComputedStyle(character).width);
let characterHeight = parseInt(window.getComputedStyle(character).height);

let obstacle = document.getElementById("obstacle");
let obstacleHeight = parseInt(window.getComputedStyle(obstacle).height);
let obstacleWidth = parseInt(window.getComputedStyle(obstacle).width);

let hitboxCharacter = document.getElementById("hitbox-character");
let hitboxObstacle = document.getElementById("hitbox-obstacle");

let jetParticle = document.getElementById("jet-particle");

var scoreCount = document.getElementById("score-count");
var timeIn = document.getElementById("time-in");
let reloading = false;
let obstacleSpeed;
let difficulty = 10;
let body = document.querySelector("body");
let down;
let up;
let running = false;

console.log(characterWidth, characterHeight, obstacleHeight, obstacleWidth);

addEventListener("mousedown", mouseDown);
addEventListener("mouseup", mouseUp);
timeCount = 3; //in seconds

reload();

function mouseDown() {
  console.log("moused");
  down = true;
}

function mouseUp() {
  down = false;
  console.log("mouseu");
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function jump() {
  if (characterTop > gameTop) {
    character.style.top = characterTop - characterJump + "px";
    characterTop = characterTop - characterJump;
    character.style.transform = "rotate(5deg)";
    jetParticle.style.visibility = "visible";
  }
}

let gravity = setInterval(function () {
  if (down == true) {
    setTimeout("jump()", 10);
  } else {
    if (characterTop != gameTop + gameHeight - characterHeight) {
      character.style.top = characterTop + characterGravity + "px";
      characterTop = characterTop + characterGravity;
      character.style.transform = "rotate(-5deg)";
      jetParticle.style.visibility = "hidden";
    } else {
      character.style.transform = "rotate(0deg)";
    }
  }
}, 5);

function runRandom() {
  var randomize;
  if (reloading == false && running == false) {
    running = true;
    randomize = setInterval(function () {
      obstacle.style.top = gameTop + getRandomInt(gameHeight - 30) + "px";
      console.log("run");
      if (reloading == true) {
        console.log("stop");
        running = false;
        clearInterval(randomize);
      }
    }, 1000);
  }
}

let check = setInterval(function () {
  var characterLeft = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  var characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  //console.log(characterLeft, characterTop);

  var obstacleLeft = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left")
  );
  var obstacleTop = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("top")
  );
  //console.log(obstacleLeft, obstacleTop);
  //hitbox tester
  /*hitboxObstacle.style.top = obstacleTop + "px";
  hitboxObstacle.style.left = obstacleLeft + "px";

  hitboxCharacter.style.top = characterTop + "px";
  hitboxCharacter.style.left = characterLeft + "px";*/

  jetParticle.style.top = characterTop + 50 + "px";
  jetParticle.style.left = characterLeft + "px";

  if (
    /*characterLeft < obstacleLeft + obstacleWidth &&
    characterLeft + characterWidth > obstacleLeft &&
    characterTop < obstacleTop + obstacleHeight &&
    characterTop + characterHeight > obstacleTop*/
    /*obstacleLeft < 41 && characterTop > 130*/
    characterLeft < obstacleLeft + obstacleWidth &&
    characterLeft + characterWidth > obstacleLeft &&
    characterTop < obstacleTop + obstacleHeight &&
    characterTop + characterHeight > obstacleTop
  ) {
    if (reloading == false) {
      reload();
      console.log("hit");
    }
  }
}, 10);

var addScore = setInterval(function () {
  if (reloading == false) {
    score++;
    scoreCount.textContent = score;
    difficulty++;
  }
}, 100);

function reload() {
  difficulty = 0;
  obstacleSpeed = 1;
  reloading = true;
  obstacle.classList.remove("obstacle-move");
  obstacle.style.visibility = "hidden";
  timeIn.style.visibility = "visible";
  let count = timeCount;
  timeIn.textContent = count;

  let countdown = setInterval(countdownTimer, 1000);
  function countdownTimer() {
    console.log("score 0");
    count--;
    score = 0;
    timeIn.textContent = count;
    if (count == 0) {
      obstacle.classList.add("obstacle-move");
      obstacle.style.visibility = "visible";
      timeIn.style.visibility = "hidden";
      reloading = false;
      count = timeCount;
      clearInterval(countdown);
      runRandom();
    }
  }
}
