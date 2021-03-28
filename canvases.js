const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");
const c4 = document.getElementById("c4");

class Screen {
  constructor(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.hi = 144; //9 blocks
    this.wid = 288; //18 blocks
    this.canvas.width = this.wid;
    this.canvas.height = this.hi;
  }
  
  fill(r,g,b){
    this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    this.ctx.fillRect(0, 0, this.wid, this.hi);
  }
  clear(){
    this.ctx.clearRect(0, 0, this.wid, this.hi);
  }
  border(){
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, 2, this.hi);
    this.ctx.fillRect(this.wid, 0, -2, this.hi);
    this.ctx.fillRect(0, 0, this.wid, 2);
    this.ctx.fillRect(0, this.hi, this.wid, -2);
  }

  image(img, x, y){
    this.ctx.drawImage(img, x, y);
  }
}

const screens = {
  tl: new Screen(c1, c1.getContext("2d")),
  tr: new Screen(c2, c2.getContext("2d")),
  bl: new Screen(c3, c3.getContext("2d")),
  br: new Screen(c4, c4.getContext("2d"))
}

const screenMap = {
  tl: "c1",
  tr: "c2",
  bl: "c3",
  br: "c4"
}

// screens.tl.border()
// screens.tr.border()
// screens.bl.border()
// screens.br.border()