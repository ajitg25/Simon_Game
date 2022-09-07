
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


// function user_to_do(){
//     var cnt = 0;
//     while(cnt<to_do.length){
//         $(this).click(function(event){
//             console.log(event.target.id);
//             var click_block = event.target.id;
//             if(to_do[cnt]!="#"+click_block){
//                 makeSound("wrong");
//                 $("h1").text("Game Over, Press any key to restart!");
//                 return "X";
//             }
//             else{
//                 makeSound(click_block);
//             }
            
//         });
//         cnt++;
//     }
//     return "Y";

    
// }
// function game(){
//     var game_level =1;
//     console.log(col);
//     $("h1").text("Level "+ game_level);
//     while(a!=="X"){
//         random_color();
//         var a = user_to_do();
//         game_level++;
//         $("h1").text("Level "+ game_level);
//     }
    
    
// }

// game();


// function makeSound(click_block){
//     switch(click_block){
//         case "blue":
//             playAudio("sounds/blue.mp3");
//             break;
//         case "green":
//             playAudio("sounds/green.mp3");
//             break;
//         case "red":
//             playAudio("sounds/red.mp3");
//             break;
//         case "yellow":
//             playAudio("sounds/yellow.mp3");
//             break;
//         case "wrong":
//             playAudio("sounds/wrong.mp3");
//     }
// }
// function playAudio(songName){
//     var audio = new Audio("sounds/" + songName + ".mp3");
//     audio.play();
// }