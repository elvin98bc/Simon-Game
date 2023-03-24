
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];


var started = false;
var level = 0;

$(document).on("keydown", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function (){

    // Alternative solution : 
    // var userChosenColours = event.currentTarget.id;  
  
    var userChosenColours = $(this).attr("id"); // "this" return the currentTarget such as : <div type="button" id="green" class="btn green"> 
    userClickedPattern.push(userChosenColours);

    playSound(userChosenColours); //Click Sounds
    animatePress(userChosenColours); //Click animation

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout (function() {
                nextSequence();
            }, 1000); 
        
        }

    } else {

        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout (function (){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }

}

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //Flash animation
    $("#" + randomChosenColour).fadeOut(50).fadeIn(50);

    //Play Sounds
    playSound(randomChosenColour);

}

// Add animation to user clicks

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout (function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

//Play sound when the button got clicked.

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

 }

function startOver(){

     level = 0;
     gamePattern = [];
     started = false;
    
}

