var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// display Level 0 when the key is pressed first time
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// record the sequennce of user selected colours
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  compare(userClickedPattern.length - 1);
});

function compare(answer) {
  if (userClickedPattern[answer] === gamePattern[answer]) {
    console.log("success");
    //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // when the user pressed a wrong button play wrong.mp3,
    // show red background colour for 200 milliseconds 
    // and change the title to 'Game Over,Press Any Key to Restart'
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver()
  }
}
// randomly select different colour buttons
function nextSequence() {
  userClickedPattern = [];
  level++;
  // display the level of the game
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // show an animation when the button is pressed
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// play sound when the button is pressed
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// show animation when the button is pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// reset the level, pattern of the game and var started when the user clicks
// a wrong button
function startOver(){
  level = 0;
  gamePattern =[];
  started = false;
}
