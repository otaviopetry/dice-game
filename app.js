var welcomeScreen = document.querySelector(".welcome.row");

var player1Display = document.querySelector(".player1Name");
var player2Display = document.querySelector(".player2Name");

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

var count = 0;

var player1Name = "";
var player2Name = "";

var playButton = document.querySelector("#startGame");

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

rollTheDice.addEventListener("click", function() {
    var dice1Result = Math.ceil((Math.random()) * 6);
    var dice2Result = Math.ceil((Math.random()) * 6);
    var turnOutput = document.createElement("div");
    turnOutput.innerHTML = '<div class="round">Rodada ' + count + " => " + "<strong>" + player1Name + "</strong> " + dice1Result + "  x  " + dice2Result + " <strong>" + player2Name + "</strong></div><br>";
    var lastRound = document.querySelector(".score .outputs .round");

    dice1.innerHTML = "";
    dice2.innerHTML = "";
    
    diceLoop(dice1Result, dice1);
    diceLoop(dice2Result, dice2);

    if ( dice1Result > dice2Result ) {
        player1Score++;
    } else if ( dice1Result < dice2Result ) {
        player2Score++;
    }

    player1ScoreDisplay.innerHTML = "Vitórias: " + player1Score;
    player2ScoreDisplay.innerHTML = "Vitórias: " + player2Score;

    scoreHistory.push(turnOutput);
    lastRound.parentNode.insertBefore(turnOutput, lastRound);

    count++;
});

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
        player1ScoreDisplay.innerHTML = "Vitórias: 0";
        player2ScoreDisplay.innerHTML = "Vitórias: 0";
        keepScore.innerHTML = '<div class="round"></div>';
        welcomeScreen.classList.remove("disabled");
        
        document.querySelector("#player1").value = "";
        document.querySelector("#player2").value = "";
    }, 100)        
    
})
