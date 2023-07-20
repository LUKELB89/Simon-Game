let gameStarted = false

let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

function nextSequence() {
    userClickedPattern = [];
    level++
    $('h1').text(`Level ${level}`)
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}

$('.btn').on('click', function () {
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    let colourClicked = currentColour;
    $("#" + colourClicked).addClass('pressed')

    setTimeout(function () {
        $("#" + colourClicked).removeClass('pressed')
    }, 100)
}

$(document).keypress(function () {
    if (gameStarted === false) {
        gameStarted = true;
        nextSequence();
    }
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    }
    else {
        playSound('wrong')
        $("body").addClass('game-over');
        setTimeout(function () {
            $("body").removeClass('game-over')
        }, 200);
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = []
    gameStarted = false;
}



// let yellowButton = $('#yellow')
// let redButton = $('#red')
// let greenButton = $('#green')
// let blueButton = $('#blue')
// let buttons = $('.btn')

// buttons.click(function () {
//     let userChosenColour = $(this).attr('id');

//     switch (userChosenColour) {
//         case 'yellow':
//             let yellowSound = new Audio('sounds/yellow.mp3')
//             yellowSound.play();
//             yellowButton.addClass('pressed')
//             setTimeout(function () {
//                 yellowButton.removeClass('pressed')
//             }, 100)
//             break;

//         case 'red':
//             let redSound = new Audio('sounds/red.mp3')
//             redSound.play();
//             redButton.addClass('pressed')

//             setTimeout(function () {
//                 redButton.removeClass('pressed')
//             }, 100)
//             break;

//         case 'green':
//             let greenSound = new Audio('sounds/green.mp3')
//             greenSound.play();
//             greenButton.addClass('pressed')

//             setTimeout(function () {
//                 greenButton.removeClass('pressed')
//             }, 100)
//             break;

//         case 'blue':
//             let blueSound = new Audio('sounds/blue.mp3')
//             blueSound.play();
//             blueButton.addClass('pressed')

//             setTimeout(function () {
//                 blueButton.removeClass('pressed')
//             }, 100)
//             break;

//         default: console.log(randomChosenColour)
//             break;
//     }
// })