console.log("page loaded");


let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d'); 
const W = 640;
const H = 480;

function currentTime() {
    return new Date().getTime(); 
}

let animationStart = currentTime(); //время начала всей анимации
let lastFrameTime = currentTime(); //время рисования последнего кадра

var massBalls = [{ x: 20, y: 20, r: 20, vx: 70, vy: 85, color: "red"}, { x: 380, y: 10, r: 10, vx: 150, vy: 200, color: "green"} , { x: 35, y: 300, r: 30, vx: 30, vy: 45, color: "blue"}, { x: 350, y: 290, r: 25, vx: 20, vy: 15, color: "black"}]

function draw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "#f9ffcf";
    ctx.fillRect(0, 0, W, H);
    
    for(var i = 0; i < massBalls.length; i++){
        ctx.beginPath();
        ctx.arc(massBalls[i].x, massBalls[i].y, massBalls[i].r, 0, Math.PI*2);
        ctx.fillStyle = massBalls[i].color;
        ctx.fill();
    }
    
}

function step(timeFromAnimationStart, timeFromLastFrame) {
    for(var i = 0; i < massBalls.length; i++){
        if (massBalls[i].y + massBalls[i].r > H) massBalls[i].vy = -massBalls[i].vy;
        if (massBalls[i].x + massBalls[i].r > W) massBalls[i].vx = -massBalls[i].vx;
        if (massBalls[i].x - massBalls[i].r < 0) massBalls[i].vx = -massBalls[i].vx;
        if (massBalls[i].y - massBalls[i].r < 0) massBalls[i].vy = -massBalls[i].vy;

        massBalls[i].x = massBalls[i].x + massBalls[i].vx * (timeFromLastFrame / 1000); 
        massBalls[i].y = massBalls[i].y + massBalls[i].vy * (timeFromLastFrame / 1000);

    }
    
}


function tick() {
    let now = currentTime();
    let timeFromAnimationStart = now - animationStart;
    let timeFromLastFrame = now - lastFrameTime;
    lastFrameTime = now;

    step(timeFromAnimationStart, timeFromLastFrame);
    draw();
    requestAnimationFrame(tick);
}


tick(); 