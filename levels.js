class Level{
  constructor(maps){
    this.screens = [screens.tl, screens.tr, screens.bl, screens.br];
    this.maps = maps;

    this.collisions = [];
  }

  draw(){
    this.collisions = []
    for (var i = 0; i < 4; i++){
      //console.log("Draw");
      this.collisions.push([]); // this is level.collisions
      for (var block of this.maps[i]){
        this.screens[i].image(images[block[0]], block[1], block[2]);
        if (block[3] == 1){
          var bounds = [block[1], block[2], block[1] + 16, block[2] + 16];
          this.collisions[i].push(bounds);
        }
      }

    }

  }
}

class Block{
  constructor(x, y, imageNum){
    this.img = imageNum;
    this.x = x;
    this.y = y;
  }

  draw(canvas){
    canvas.image(images[this.img], this.x, this.y);
  }

}

//Maps 
var level1 = [
  // screen 1
  [],
  // screen 2
  [],
  // screen 3
  [],
  // screen 4
  []
];

for (let i = 0; i < 18; i++){
  level1[0].push([9, i*16, 128, 1]);
}
for (let i = 0; i < 6; i++){
  level1[1].push([9, i*16, 128, 1]);
}
for (let i = 10; i < 18; i++){
  level1[1].push([9, i*16, 128, 1]);
}
for (let i = 0; i < 18; i++){
  level1[3].push([9, i*16, 128, 1]);
}

var levels = [new Level(level1)]; //initializes a level