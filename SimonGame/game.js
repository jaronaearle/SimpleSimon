var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var firstKeyPress = true;
var level = 0;

//tracks if game has started
$(document).keypress(function() {
  if (firstKeyPress) {
    nextSequence();
    firstKeyPress = false;
  }
  $("#Level-title").text("level " + level);
});

// tracks the buttons the user has pressed
$(".btn").on("click", function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
});

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  firstKeyPress = true;
  level = 0;
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence(), 5000);
      userClickedPattern = [];
    }
  } else if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
    var wrongButtonSound = new Audio("sounds/wrong.mp3");
    wrongButtonSound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass();
    }, 200);
    $("#level-title").text("Game Over, Press Any Key To Restart!");
    startOver();


  }
}

$(".btn").click(function() {
  checkAnswer(userClickedPattern.length - 1);
});

// plays sounds
function playSound(name) {
  switch (name) {
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;

    default:
      console.log(name);
  }
}
// creates the next sequence for the game
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //Randomizes selection from array and appends to the pattern array
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  // flashes randomly selected button
  playSound(randomChosenColor); // works in firefox, chrome needs additional function
  level++;
  //updates the header with the current level
  $("#level-title").text("Level " + level);

}

// flashes buttons on click
function animateButtons(currentColor) {
  $("." + currentColor).addClass("pressed");

  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

// Adds sound to button presses
$(".btn").on("click", function(event) {
  var userChosenColor = event.target.id;
  playSound(userChosenColor);
  animateButtons(userChosenColor);
});
