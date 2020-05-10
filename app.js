var welcomeScreen = document.querySelector(".welcome.row");
var mainScreen = document.querySelector(".main.row");

var player1Display = document.querySelector(".player1Name");
var player2Display = document.querySelector(".player2Name");

var gameOver = document.querySelector(".game-over");

var diceeContainer = document.querySelector(".dices");
var dice1 = document.querySelector(".dice1");
var dice2 = document.querySelector(".dice2");
var rollTheDice = document.getElementById("rollTheDice");

var disabledElements = document.querySelectorAll(".disabled");
var resetButton = document.getElementById("resetGame");

var output1 = '<figure><img src="img/1.svg" alt="Número 1"></figure>';
var output2 = '<figure><img src="img/2.svg" alt="Número 2"></figure>';
var output3 = '<figure><img src="img/3.svg" alt="Número 3"></figure>';
var output4 = '<figure><img src="img/4.svg" alt="Número 4"></figure>';
var output5 = '<figure><img src="img/5.svg" alt="Número 5"></figure>';
var output6 = '<figure><img src="img/6.svg" alt="Número 6"></figure>';
var outputsArray = [output1, output2, output3, output4, output5, output6];

var keepScore = document.querySelector(".keep-score .outputs");
var scoreHistory = [];
var winner = "";
var player1ScoreDisplay = document.querySelector(".player1Score");
var player2ScoreDisplay = document.querySelector(".player2Score");
var player1Score = 0;
var player2Score = 0;

var gameLimitDisplay = document.querySelector(".game-limit");

var count = 0;

var player1Name = "";
var player2Name = "";

var playButton = document.querySelector("#startGame");

var radioButtons = document.querySelectorAll('input[name="gameLimit"]');
var gameLimit = -1;
var nonDrawRound = 0;

var dice1Result = 0;
var dice2Result = 0;

document.onload = document.getElementById("infinite").checked = true;

radioButtons.forEach( (btn) => {
    btn.addEventListener("click", function () {
        if ( this.value === "bo5" ) {
            gameLimit = 5;
            gameLimitDisplay.innerHTML = "Melhor de 5";
        } else if ( this.value === "bo9" ) {
            gameLimit = 9;
            gameLimitDisplay.innerHTML = "Melhor de 9";
        } else {
            gameLimit = -1;
        }
    })
})

playButton.addEventListener("click", function () {
    player1Name = document.querySelector("#player1").value;
    player2Name = document.querySelector("#player2").value;

    if ( player1Name !== "" && player2Name !== "" ) {
        player1Display.innerHTML = player1Name;
        player2Display.innerHTML = player2Name;

        var disabledPanels = document.querySelectorAll(".disabled");

        disabledPanels.forEach( (panel) => {
            panel.classList.remove("disabled");
        })
        welcomeScreen.classList.add("disabled");    

        count = 1;
    } else {
        document.querySelector(".welcome-players .error").innerHTML = "Informa os nomes, jovem!";
    }
        
})

if ( gameLimit === -1 ) {
    gameLimitDisplay.innerHTML = "Modo infinito";
} else if ( gameLimit === 5 ) {
    gameLimitDisplay.innerHTML = "Melhor de 5";
} else {
    gameLimitDisplay.innerHTML = "Melhor de 9";
}

rollTheDice.addEventListener("click", function() {

    dice1Result = Math.ceil((Math.random()) * 6);
    dice2Result = Math.ceil((Math.random()) * 6);   

    dice1.innerHTML = "";
    dice2.innerHTML = "";
    
    diceLoop(dice1Result, dice1);
    diceLoop(dice2Result, dice2);

    if ( dice1Result > dice2Result ) {
        player1Score++;
        nonDrawRound++;
    } else if ( dice1Result < dice2Result ) {
        player2Score++;
        nonDrawRound++;
    }

    if ( gameLimit === -1 ) {
        handleContinuity();
    } else if ( player1Score === gameLimit - Math.floor(gameLimit/2) || player2Score === gameLimit - Math.floor(gameLimit/2) ) {
        handleContinuity();
        gameOver.classList.remove("special-disabled");
        diceeContainer.classList.add("disabled");
        dice1.classList.add("disabled");
        dice2.classList.add("disabled");
        rollTheDice.disabled = true;
        rollTheDice.classList.add('transparent');
    } else {
        handleContinuity();        
    }

    count++;
});

function handleContinuity () {
    player1ScoreDisplay.innerHTML = "Vitórias: " + player1Score;
    player2ScoreDisplay.innerHTML = "Vitórias: " + player2Score;
    var turnOutput = document.createElement("div");
    var lastRound = document.querySelector(".outputs .round");
    turnOutput.innerHTML = '<div class="round">Rodada ' + count + " => " + "<strong>" + player1Name + "</strong> " + dice1Result + "  x  " + dice2Result + " <strong>" + player2Name + "</strong></div><br>";

    scoreHistory.push(turnOutput);
    lastRound.parentNode.insertBefore(turnOutput, lastRound);
}

function diceLoop (result, dice) {

    dice.innerHTML = outputsArray[result-1];

}

resetButton.addEventListener("click", function () {

    setTimeout( function () {
        disabledElements.forEach( (element) => {
            element.classList.add("disabled");
        })
        count = 0;
        scoreHistory = [];
        player1Score = 0;
        player2Score = 0;
        nonDrawRound = 0;
        gameLimit = -1;
        player1ScoreDisplay.innerHTML = "Vitórias: 0";
        player2ScoreDisplay.innerHTML = "Vitórias: 0";
        keepScore.innerHTML = '<div class="round"></div>';
        welcomeScreen.classList.remove("disabled");
        gameOver.classList.add("special-disabled");
        
        document.querySelector("#player1").value = "";
        document.querySelector("#player2").value = "";
        document.onload = document.getElementById("infinite").checked = true;
        rollTheDice.disabled = false;
        rollTheDice.classList.remove("transparent");
    }, 100)        
    
})
