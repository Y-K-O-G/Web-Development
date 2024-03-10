function rollDices() {
    document.querySelectorAll(".dice").forEach(die => die.style.display = "none");
    var dice1 = Math.round(Math.random() * 5 + 1);
    var dice2 = Math.round(Math.random() * 5 + 1);
    if(dice1 == 1) {
        document.querySelector(".player1 .dice1").style.display = "inline";
    } else if(dice1 == 2) {
        document.querySelector(".player1 .dice2").style.display = "inline";
    } else if(dice1 == 3) {
        document.querySelector(".player1 .dice3").style.display = "inline";
    } else if(dice1 == 4) {
        document.querySelector(".player1 .dice4").style.display = "inline";
    } else if(dice1 == 5) {
        document.querySelector(".player1 .dice5").style.display = "inline";
    } else if(dice1 == 6) {
        document.querySelector(".player1 .dice6").style.display = "inline";
    }

    if(dice2 == 1) {
        document.querySelector(".player2 .dice1").style.display = "inline";
    } else if(dice2 == 2) {
        document.querySelector(".player2 .dice2").style.display = "inline";
    } else if(dice2 == 3) {
        document.querySelector(".player2 .dice3").style.display = "inline";
    } else if(dice2 == 4) {
        document.querySelector(".player2 .dice4").style.display = "inline";
    } else if(dice2 == 5) {
        document.querySelector(".player2 .dice5").style.display = "inline";
    } else if(dice2 == 6) {
        document.querySelector(".player2 .dice6").style.display = "inline";
    }

    if(dice1 == dice2) {
        document.querySelector(".score").innerHTML = "Draw!";
        document.querySelector(".roll").style.fontSize = "5vw";
    }

    if(dice1 > dice2) {
        document.querySelector(".score").innerHTML = "🚩 Player 1 wins!";
        document.querySelector(".roll").style.fontSize = "5vw";
    }

    if(dice1 < dice2) {
        document.querySelector(".score").innerHTML = "Player 2 wins! 🚩";
        document.querySelector(".roll").style.fontSize = "5vw";
    }
}