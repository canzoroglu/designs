const canvas = document.querySelector("#board");
const context = canvas.getContext("2d");




function drawRect(x, y, w, h, color){
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}
function drawCircle(x, y, r, color){
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI*2, false);
  context.closePath();
  context.fill();
}
function drawText(text, x, y, color){
  context.fillStyle = color;
  context.font = "75px fantasy";
  context.fillText(text, x, y);
}
let rectX = 0;
function render() {
  drawRect(0, 0, 600, 500, "black");
  drawRect(rectX, 50, 50, 100, "red");
  rectX += 10;
  if(rectX >= 550) rectX = 0;
}
let clr = setInterval(render, 1000);
document.addEventListener("keypress", e => clearInterval(clr));
