//variables needed: wordList, playing, time, object(wins, losses, highscores)
//function needed: LoadScores; saveScores; checkIfThere(takes a string)
var winsID = document.querySelector("#winsId");
var lossesID = document.querySelector("#lossesId");
var button1 = document.querySelector("#game");
var timeEl = document.querySelector("#timeID");
var guessArea = document.querySelector("#guessContainer");
var wordList = ["intensify","enhance","exchange","presentation",'justify',"service",'decorative',
'cunning','conspiracy','central','breathe','convert','pattern','instrument','interference','industry',
'deteriorate','profession','shoulder','suspect','horizon','broadcast','audience','referee','trouser',
'reserve','compose','color-blind','bathtub','apology','disappear','finance','coalition','nervous',
'conception','constraint','prosper','breakfast','genetic','soldier','recognize','deposit','allowance',
'mystery','farewell','conversation','buttocks','material','prescription'];

function loadScores() {
    var lastTotalScores = JSON.parse(localStorage.getItem("scores"));
    if(lastTotalScores == null){
        return;
    }else{
        winsID.textContent = lastTotalScores.wins;
        lossesID.textContent = lastTotalScores.losses;
    }
}

function saveScores() {
    //get information from the html
    var totalScores = {
        wins: winsID.textContent,
        losses: lossesID.textContent
    };
    localStorage.setItem("scores", JSON.stringify(totalScores));
}

function getRandomWord(){
    return wordList[Math.floor(Math.random * wordList.length)];
}

function makeDashes(str){
    var dashes = "";
    for(var i = 0; i < str.length; i++){
        dashes = dashes + "_ ";
    }
    guessArea.textContent = dashes;
}






var currentWord;
var isPlaying = false;

//listens for keypresses
document.addEventListener("keypress", function(event){
    if(isPlaying){
        for(var i = 0; i > word.length; i++){
            if(event.key == word[i]){
                guessArea.textContent[i] == event.key;
            }
        }
    }else return;
});


//listens for click on button
button1.addEventListener("click",function() {
    this.currentWord = getRandomWord();
    var secondsLeft = 21;

    //make Dashes
    makeDashes(currentWord);
    this.isPlaying = true;

    var timerInterval = setInterval(function(){
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if(secondsLeft === 0){
            clearInterval(timerInterval);
            isPlaying = false;
            lossesID.textContent = parseInt(lossesID.textContent) + 1;
        }

        if(this.currentWord == guessArea.textContent.trim){
            clearInterval(timerInterval);
            isPlaying = false;
            winsID.textContent = parseInt(winsID.textContent) + 1;
        }
    }, 1000)

});

loadScores();
saveScores();