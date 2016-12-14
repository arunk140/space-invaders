var myFont, fontReady = false;
var user;
var bullets = [];
var aliens = [];
var GameOverFlag = false;
var btnVisible = false;
var difficultyIndex = 5;
var score = 0;
var shootSound,hitSound,GOSound;
function fontRead(){
  fontReady = true;
}
function preload() {
  myFont = loadFont("pixels.ttf", fontRead);
}
function setup() {
  shootSound = loadSound('shoot.wav');
  hitSound = loadSound('invaderkilled.wav');
  GOSound = loadSound('pacman_death.wav');
  createCanvas(720, 400);
  user = new userShip(width/2,height+10);
  frameRate(60);

}
function resetGame() {
  location.reload();
}
function draw() {
  background(000);
  // line(56, 46, 55, 55);

  if (fontReady && !GameOverFlag) {
    user.show();
    user.update();
    if (aliens.length<difficultyIndex) {
      var alien = new Alien(user.x, height);
      aliens.push(alien);
    }
    if(keyIsDown(LEFT_ARROW)){
      user.move('left');
    }else if(keyIsDown(RIGHT_ARROW)){
      user.move('right');
    }
    for (var i = 0; i < aliens.length; i++) {
      aliens[i].show();
      aliens[i].update();
      if(aliens[i].y>(height-20)){
        // clear();
        fill(255);
        textSize(36);
        textFont("Arial");
        text("Game Over", ((width/2)-100), height/2);
        GameOverFlag=true;

      }
    }
    for (var i = 0; i < bullets.length; i++) {
      bullets[i].show();
      bullets[i].move();
      for (var j = 0; j < aliens.length; j++) {
        if (bullets[i].hits(aliens[j])) {
          aliens.splice(j, 1);
          // bullets.splice(i, 1);
          bullets[i].delmefn();
          score=score+1;
          hitSound.play();

          if(score%8==0){
            difficultyIndex=difficultyIndex+1;
          }
        }
      }
    }


    for (var i = 0; i < bullets.length; i++) {
      if(bullets[i].y<0 || bullets[i].delme== true){
        bullets.splice(i, 1);
      }
    }

  }else {
    fill(255);
    textSize(36);
    textFont("Arial");
    var GOStr = "Final Score "+score;
    text(GOStr, ((width/2)-100), height/2);
    if (!btnVisible) {
      var button = createButton('Restart Game');
      button.mousePressed(resetGame);
      btnVisible = true;
      GOSound.play();
    }
  }


}
function keyPressed() {
  if(!GameOverFlag){
    if(keyCode === 65){
      var alien = new Alien(user.x, height);
      aliens.push(alien);
    }else if (keyCode === RIGHT_ARROW) {
      // console.log('Right!');
      // user.move('right');

    }else if(keyCode === 32){
      shootSound.play();
      var bullet = new Bullet(user.x, height);
      bullets.push(bullet);
    }else {
      // console.log(keyCode);
    }
  }
}


function userShip(x,y) {
  this.x = 50;
  this.y = height-20;
  this.length =10;
  this.show = function() {
    fill(255);
    textSize(36);
    textFont(myFont);
    text("W", this.x, this.y);
  };
  this.update = function () {

  }
  this.move = function (direction) {
    if (direction=='right') {
      this.x=this.x+5;
    }else if(direction=='left'){
      this.x=this.x-5;
    }
    this.x = constrain(this.x, 50, width-50);
  }
}
function Bullet(x, y) {
  this.x = x;
  this.y = y;
  this.r = 3;
  this.delme = false
  this.show = function() {
    noStroke();
    fill(51,0,255);
    ellipse(this.x+13, this.y-30, this.r*2, this.r*2);
  }

  this.move = function() {
    this.y = this.y - 15;
  }
  this.delmefn = function () {
    this.delme = true;
  }

  this.hits = function(alien) {
    var d = dist(this.x, this.y, alien.x, alien.y);
    if (d < 20) {
      return true;
    } else {
      return false;
    }
  }
}
function Alien(x, y) {
  this.x = random(50,width-50);
  this.y = random(20,height/2);
  var types=['I','H']
  this.show = function() {
    fill(204,255,0);
    textSize(36);
    textFont(myFont);
    text(random(types), this.x, this.y);

  }
  this.update = function () {
    this.y=this.y+0.5;
  }
}
