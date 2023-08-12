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
let characterLeft;

let jetpack = document.getElementById("jetpack");
let jetpackTopOffset = 10;
let jetpackLeftOffset = 10;

let obstacle = document.getElementById("obstacle");
let obstacleHeight = parseInt(window.getComputedStyle(obstacle).height);
let obstacleWidth = parseInt(window.getComputedStyle(obstacle).width);
let obstacleLeft;
let obstacleTop;
let obstacleDifficulty;
let obstacleRotate = 0;

let hitboxCharacter = document.getElementById("hitbox-character");
let hitboxObstacle = document.getElementById("hitbox-obstacle");

let jetParticle = document.getElementById("jet-particle");

let score;
var scoreCount = document.getElementById("score-count");
var timeIn = document.getElementById("time-in");
let reloading = false;
let obstacleSpeed;
let body = document.querySelector("body");
let down;
let up;
let running = false;

//console.log(characterWidth, characterHeight, obstacleHeight, obstacleWidth);

addEventListener("mousedown", mouseDown);
addEventListener("mouseup", mouseUp);
timeCount = 3; //in seconds
characterTop = gameTop + gameHeight - characterHeight;
character.style.top = characterTop + "px";
obstacle.style.visibility = "hidden";
reload();

function mouseDown() {
  //console.log("moused");
  down = true;
}

function mouseUp() {
  down = false;
  //console.log("mouseu");
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

let jetpackMove = setInterval(function () {
  setTimeout(function () {
    jetpack.style.top = characterTop + jetpackTopOffset + "px";
    jetpack.style.left = characterLeft - jetpackLeftOffset + "px";
    var characterRotate = parseInt(
      window.getComputedStyle(character).getPropertyValue("transform")
    );
    jetpack.style.transfrom = "rotate(" + characterRotate + "deg)";
  }, 50);
}, 10);

let gravity = setInterval(function () {
  if (reloading == false) {
    if (down == true) {
      setTimeout("jump()", 10);
    } else if (characterTop != gameTop + gameHeight - characterHeight) {
      character.style.top = characterTop + characterGravity + "px";
      characterTop = characterTop + characterGravity;
      character.style.transform = "rotate(-5deg)";
      jetParticle.style.visibility = "hidden";
    } else {
      character.style.transform = "rotate(0deg)";
    }
  } else {
    jetParticle.style.visibility = "hidden";
  }
}, 5);

let difficulty = setInterval(function () {
  obstacleDifficulty = score / 200 + 1;
}, 100);

let obstacleMove = setInterval(function () {
  if (reloading == false) {
    if (obstacleLeft > gameLeft) {
      obstacleLeft = obstacleLeft - obstacleDifficulty; //move towards player zone
      obstacleRotate = obstacleRotate - obstacleDifficulty / 2 - 2;
    } else {
      obstacleLeft = gameLeft + gameWidth;

      let selection = getRandomInt(3); //randomize whether position is random or targeted towards character
      if (selection == 1) {
        obstacle.style.top = characterTop + "px";
      } else {
        obstacle.style.top = gameTop + getRandomInt(gameHeight - 30) + "px";
      }
      //console.log(obstacleLeft);
    }
    //console.log(obstacleRotate);
    obstacle.style.left = obstacleLeft;
    obstacle.style.transform = "rotate(" + obstacleRotate + "deg)";
    //obstacle.style.transform = "rotate(200deg)";
  }
  obstacle.style.left = obstacleLeft + "px";
}, 5);

let check = setInterval(function () {
  characterLeft = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  //console.log(characterLeft, characterTop);

  obstacleLeft = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left")
  );
  obstacleTop = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("top")
  );
  //console.log(obstacleLeft, obstacleTop);
  //hitbox tester
  /*hitboxObstacle.style.top = obstacleTop + "px";
  hitboxObstacle.style.left = obstacleLeft + "px";

  hitboxCharacter.style.top = characterTop + "px";
  hitboxCharacter.style.left = characterLeft + "px";*/

  jetParticle.style.top = characterTop + jetpackTopOffset + 30 + "px";
  jetParticle.style.left = characterLeft - jetpackLeftOffset * 2 + "px";

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
  reloading = true;
  obstacle.classList.remove("obstacle-move");
  //obstacle.style.visibility = "hidden";
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
      obstacleLeft = gameLeft + gameWidth;
      obstacle.classList.add("obstacle-move");
      obstacle.style.visibility = "visible";
      timeIn.style.visibility = "hidden";
      characterTop = gameTop + gameHeight - characterHeight;
      character.style.top = characterTop + "px";
      reloading = false;
      count = timeCount;
      clearInterval(countdown);
      //obstacleMove();
    }
  }
}
