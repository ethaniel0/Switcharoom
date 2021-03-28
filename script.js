const fps = 30;  // Valid values are 60,30,20,15,10...
// set the mim time to render the next frame
const frame_time = (1000/60) * (60 / fps) - (1000/60) * 0.5;
var lastFrameTime = 0;  // the last frame time

level = 0;


/**
  this.isCollision = function(x, y, sim){
    if (x < 0 || x + this.wid > 127){
      return 1;
    }
    return levels[currentLevel].collide(x, y - this.hi + 1, x+this.wid - 1, y, sim);
  };

  this.correctPos = function(){
      
    var prevx = this.x;
    var prevy = this.y;
    
    this.x = this.lastx;
    this.y = this.lasty;
  
    // make the velocity a unit vector
    var v = sqrt(pow(this.vel.y,2) + pow(this.vel.x,2));
    if (v === 0) {
      return;}
    var vx = this.vel.x/v;
    var vy = this.vel.y/v;
    var collision = this.isCollision(round(this.x + vx), round(this.y + vy), true);
    
    while (!collision){
      this.x += vx;
      this.y += vy;
      collision = this.isCollision(round(this.x + vx), round(this.y + vy), true);
    }
    
    var colx1 = this.isCollision(round(this.x) + 1, round(this.y), true) || this.isCollision(round(this.x) - 1, round(this.y), true);
    var coly1 = this.isCollision(round(this.x), round(this.y)+1, true) || this.isCollision(round(this.x), round(this.y)-1, true);
    
    if (!colx1){
      this.x = prevx;
    }
    if (!coly1){
      this.y = prevy;
    }
    else if (!this.dash.dashing){
      this.vel.y = 0;
    }
    
    this.px = round(this.x);
    this.py = round(this.y);
  };
        
 */

/**
 this.collide = function(x0, y0, x1, y1, sim){
    for (var i = max(y0, 0); i <= min(y1, 127); i++){
      for (var j = max(x0, 0); j <= min(x1, 127); j++){
        if (this.collisionMap[i][j] !== false){
          return this.collisionMap[i][j];
        }
      }
    }
      
    for (var i = 0; i < this.animatedBlocks.length; i++){
      var c = this.animatedBlocks[i].collide(x0, y0, x1-x0, y1-y0, sim);
      if (c){
        return c;   
      }
    }
      
    return false;
      
  }
 */

class Jared{
  constructor(x, y, live){
    this.x = x;
    this.y = y;
    this.lastx = x;
    this.lasty = y;
    this.wid = 26;
    this.hi = 20;
    this.live = live;
    this.screenName = 'tl';
    // this.screen = screens.tl;
    
    this.sprite = 0;
    this.spriteframecount = 0;

    this.still = 0;
    this.runningSprites = [0, 1, 2, 3];
    this.duckingSprites = [4, 5, 6, 7];
    this.jumpSprite = 8;

    this.vel = {
      x: 2,
      y: 0,
      maxfall: 4
    }

    this.gravity = 0.5;

    this.running = false;
    this.jumping = true;
    this.ducking = false;
  }

  move(){
    if (this.screenName.charAt(1) == 'l' && this.x >= 288){
      this.screenName = this.screenName.charAt(0) + 'r';
      this.screen = screens[this.screenName];
      this.x = 0;
    }
    if (this.screenName.charAt(0) == 't' && this.y >= 144){
      this.screenName = 'b' + this.screenName.charAt(1);
      this.screen = screens[this.screenName];
      this.y = 0;
    }
    
    this.lastx = this.x;
    this.lasty = this.y;
    this.x += this.vel.x;
    this.y += this.vel.y;

    if (this.jumping) this.vel.y = Math.min(this.vel.y + this.gravity, this.vel.maxfall);
  }
  
  drawSprite(){
    
    if (this.jumping) this.sprite = this.jumpSprite;
    else {
      if (this.spriteframecount > 2){
        this.spriteframecount = 0;
        if (this.ducking) this.sprite = (this.sprite - 3)%4 + 4;
        else this.sprite = (this.sprite +1)%4;
      }
      this.spriteframecount++;
    }
    this.hi = images[this.sprite].height;
    this.wid = images[this.sprite].width;
    console.log(this.wid);

    screens[this.screenName].image(images[this.sprite], this.x, this.y);
    
    if (this.screenName.charAt(1) == 'l' && this.x + this.wid > 288){
      screens[this.screenName.charAt(0) + 'r'].image(images[this.sprite], this.x - 288, this.y);
    }
    
    if (this.screenName.charAt(0) == 't' && this.y + this.hi > 144){
      screens['b' + this.screenName.charAt(1)].image(images[this.sprite], this.x, this.y - 144);
    }
    
  }

  swap(oldid, newid){
    if (oldid == this.screenName){
      this.screenName = newid;
    }
    else if (newid == this.screenName){
      this.screenName = oldid;
    }
  }

  collide() {
    this.jumping = false;
  }
  
  draw(){
    this.drawSprite();
    this.move();
  }
}

function getCollision(jared, level){
  const names = ['tl', 'tr', 'bl', 'br'];
  const s = names.indexOf(jared.screenName);
  
  for (block of level.collisions[s]){
    //console.log(jared.x, jared.y, block, block[3]);
    var xOverlap = jared.x + jared.wid > block[0] && jared.x < block[2];
    var yOverlap = jared.y + jared.hi > block[1] && jared.y < block[3];
    if (xOverlap && yOverlap){
      return block[1] - jared.hi; //Changed it to return top of block
    }
  }
  return false;
}


function collideJared(){
  var coly = getCollision(jared, levels[level]);
  if(coly != 0){
    jared.vel.y = 0;
    jared.y = coly;//jared.lasty;
    jared.collide();
  }
}

var jared = new Jared(10, 30, true);

//Runtime function
function update(time){
  if(time-lastFrameTime < frame_time){ //skip the frame if the call is too early
    requestAnimationFrame(update);
    return; // return as there is nothing to do
  }
  lastFrameTime = time;

  Object.keys(screens).forEach(s => {
    screens[s].clear();
    screens[s].border();
  });


  levels[level].draw();

  jared.draw();

  collideJared();

  console.log(jared.vel.y);

  requestAnimationFrame(update);

  if (jared.x > 20000) {
    window.close();
  }
}

loadImages().then(requestAnimationFrame(update));

const swapId = (target, newId) => {
  const mappedTarget = screenMap[target]
  const mappedNew = screenMap[newId]

  const first = document.getElementById(mappedTarget)
  const cachedFirstId = first.id
  const second = document.getElementById(mappedNew)

  first.id = second.id
  second.id = cachedFirstId

  screenMap[target] = mappedNew
  screenMap[newId] = mappedTarget
}


window.addEventListener("keydown", e => {
  const { code } = e

  // jared controls
  if(code == "Space") {
    jared.vel.y = -5;
    jared.jumping = true;
  }

  const screensClone = Object.assign({}, screens) // clone
  switch(code) {
    case "KeyW":
      swapId("tr", "tl");
      screens.tr = screens.tl;
      screens.tl = screensClone.tr;
      jared.swap('tr', 'tl');
      break
    case "KeyD":
      swapId("tr", "br");
      screens.tr = screens.br;
      screens.br = screensClone.tr;
      jared.swap('tr', 'br');
      break
    case "KeyS":
      swapId("br", "bl");
      screens.br = screens.bl;
      screens.bl = screensClone.br;
      jared.swap('br', 'bl');
      break
    case "KeyA":
      swapId("tl", "bl")
      screens.tl = screens.bl;
      screens.bl = screensClone.tl;
      jared.swap('tr', 'br');
      break
    }
})

window.addEventListener('keyup', e => {
  var keycode = e.keyCode;
})

