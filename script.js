function play() {
    var audio = document.getElementById("au_background_id");
    audio.play();
}

function pause() {
    var audio = document.getElementById("au_background_id");
    audio.pause();
}

let au_gameOver = new Audio();
au_gameOver.src = "audio/gameOver.wav";
const frame = document.getElementById("canvas");
const conText = frame.getContext("2d");
const box = 5;

let startGame;
let playScore = $("#score");
let title = $("#title");
let score_counter = 1;
let restartDiv = $("#restartDiv");
let restartBtn = $("#restartBtn");
let highScore = $("#highScore");
let alerDiv = $("#alertDiv");
let divCarChose = $("#carChose");
let btnCarChose1 = $("#carChose1");
let btnCarChose2 = $("#carChose2");
let btnCarChose3 = $("#carChose3");
let startText = $("#startText");
let speed = 1;

const groundImg = new Image();
groundImg.src = "img/road2.png";
const american = new Image();
american.src = "img/americanmuscle (1).png";
const ambulance = new Image();
ambulance.src = "img/ambulance.png";
const truck = new Image();
truck.src = "img/truck (1).png";
const audi = new Image();
audi.src = "img/audi (1).png";
const blackViper = new Image();
blackViper.src = "img/blackViper (1).png";
const police = new Image();
police.src = "img/Police.png";

car = {x: 67*box, y: 96*box};
let food = {
    height: 20,
    width: 8
}
let food1 = {x: (Math.floor(Math.random()*27) + 26)*box,
             y: (Math.floor(Math.random()*8) + 10)*box*(-1)};
let food2 = {x: (Math.floor(Math.random()*27) + 53)*box,
             y: (Math.floor(Math.random()*8) + 38)*box*(-1)};
let food3 = {x: (Math.floor(Math.random()*27) + 80)*box,
             y: (Math.floor(Math.random()*8) + 66)*box*(-1)};        

let d;

document.addEventListener("keydown", direction);
function direction(event) {
    if(event.keyCode == 37)
        d = "left";
    else if(event.keyCode == 38)
        d = "up";
    else if(event.keyCode == 39)
        d = "right";
    else if(event.keyCode == 40)
        d = "down";
}

function checkLost2(raceCar, blockCar) {
    var rect = {
        left: Math.max(raceCar.x, blockCar.x),
        top: Math.max(raceCar.y, blockCar.y),
        right: Math.min(raceCar.x + 7.6*box, blockCar.x + 7.6*box),
        bottom: Math.min(raceCar.y + 17.5*box, blockCar.y + 17.5*box)
    };
    if(rect.left > rect.right || rect.top > rect.bottom)
        return  false;
    else
        return true;
}

function drawBackGround(){
    conText.drawImage(groundImg, 1, 0);
}

function drawCar(typeCar) {
    let chosenCar, chosenBlockCar;
    if(typeCar === "blackViper"){
        chosenCar = blackViper;
        chosenBlockCar = truck;
    }
    if(typeCar === "audi"){
        chosenCar = audi;
        chosenBlockCar = police;
    }
    if(typeCar === "raceCar"){
        chosenCar = american;
        chosenBlockCar = ambulance;
    }
    conText.drawImage(groundImg, 0, 0);
    conText.drawImage(chosenCar, car.x, car.y);
    conText.drawImage(chosenBlockCar, food1.x, food1.y);
    conText.shadowColor = "black";
    conText.shadowBlur = 1;
    conText.shadowOffsetX = 5;
    conText.shadowOffsetY = 0;
        if(food1.y < 560)
            food1.y = food1.y + speed*box;
        else{
            food1 = {x: (Math.floor(Math.random()*27) + 26)*box,
                     y: (Math.floor(Math.random()*8) + 10)*box*(-1)};
            score++;
        }
        conText.drawImage(chosenBlockCar, food2.x, food2.y);
        if(food2.y < 560)
            food2.y = food2.y + speed*box;
        else{
            food2 = {x: (Math.floor(Math.random()*27) + 53)*box,
                     y: (Math.floor(Math.random()*8) + 38)*box*(-1)};
        }
        conText.drawImage(chosenBlockCar, food3.x, food3.y);
        if(food3.y < 560)
            food3.y = food3.y + speed*box;
        else{
            food3 = {x: (Math.floor(Math.random()*27) + 80)*box,
                     y: (Math.floor(Math.random()*8) + 66)*box*(-1)};
        }
    
    if(d === "left" &&  car.x > 27*box){
        car.x = car.x - 2*box;
        d = 0;
    }   
    if(d === "up" && car.y > 0){
        car.y = car.y - 2*box;
        d = 0;
    }  
    if(d === "right" && car.x < 715 - 34*box){
        car.x = car.x + 2*box;
        d = 0;
    }
    if(d === "down" && car.y < 600 - 24*box){
        car.y = car.y + 2*box;
        d = 0;
    }

    if(checkLost2(car, food2)||checkLost2(car, food3)||checkLost2(car, food1)){
        clearInterval(startGame);
        pause();
        au_gameOver.play();
        restartDiv.show();
        restartBtn.focus();
        conText.font = "bold 60px Times New Roman";
        conText.fillStyle ="white";
        conText.fillText("GAME OVER", 170, 40*box);
    }
    
    score_counter++;
    if(score_counter % 6 == 0){
        playScore.text(parseInt(playScore.text()) + 1);
    }
    
    if(score_counter%200 == 0){
        speed = speed + 0.3;
    }
}

$(document).ready(function () {
    $("#restartBtn").click(function () {
        location.reload();
    });
});

$(document).ready(function () {
    $("#saveBtn").click(function (){
        if (typeof(Storage) !== "undefined") {
            let uniqueId = 'id-' + Math.random().toString(36).substr(2, 16);
            localStorage.setItem(uniqueId, playScore.text());
        }
        alerDiv.show();
    });
});

$(document).ready(function () {
    $("#OKBtn").click(function (){
        alerDiv.hide();
    });
});

let backGround = setInterval(drawBackGround, 100);

$(document).ready(function () {
    $("#carChose1").click(function () {
        clearInterval(backGround);
        startGame = setInterval(function () {
            drawCar("blackViper")
        }, 30);
        divCarChose.hide();
        title.hide();
    });
});

$(document).ready(function () {
    $("#carChose2").click(function () {
        clearInterval(backGround);
        startGame = setInterval(function () {
            drawCar("audi");
        }, 30);
        divCarChose.hide();
        title.hide();
    });
});

$(document).ready(function () {
    $("#carChose3").click(function () {
        clearInterval(backGround);
        startGame = setInterval(function () {
            drawCar("raceCar")
        }, 30);
        divCarChose.hide();
        title.hide();
    });
});

function highestScore() {
    let values = [], keys = Object.keys(localStorage), i = keys.length;
    if(i == 0)
        highScore.text(0);
    else{
        while (i--) {
            values.push(parseInt(localStorage.getItem(keys[i])));
        }
        highScore.text(Math.max(...values));
    }
}

highestScore();