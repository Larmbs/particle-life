import {canvas, ctx, windowSize, hwindowSize} from './settings.js';

function Clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function Background(color) {
    canvas.style.background = color;
};

function Circle(color, radius, vector, zoomLevel, sAngle, eAngle) {
    ctx.save();
    ctx.translate(hwindowSize.x, hwindowSize.y);
    ctx.scale(zoomLevel,zoomLevel);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(vector.x, vector.y, radius, sAngle, eAngle);
    ctx.fill();
    ctx.restore();
}

function Line(color, width, vector1, vector2, zoomLevel) {
    ctx.save();
    ctx.translate(hwindowSize.x, hwindowSize.y);
    ctx.scale(zoomLevel,zoomLevel);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(vector1.x, vector1.y);
    ctx.lineTo(vector2.x, vector2.y);
    ctx.stroke();
    ctx.restore();
}

function DrawId(id, x, y){
    ctx.save()
    ctx.translate(hwindowSize.x, hwindowSize.y)
    ctx.font = `${40}px Arial`
    ctx.fillStyle = 'black'
    ctx.fillText(`${id}`,x + 20,y)
    ctx.restore()
}

function CircleGradient(center, radius) {
    ctx.save()
    ctx.translate(hwindowSize.x, hwindowSize.y)
    const radgrad = ctx.createRadialGradient(center.x, center.y, radius/10, center.x, center.y, radius);
    radgrad.addColorStop(0, "#A7D30C");
    radgrad.addColorStop(0.9, "#019F62");
    radgrad.addColorStop(1, "rgba(1, 159, 98, 0)");
    ctx.fillStyle = radgrad;
    ctx.arc(center.x , center.y, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.restore()

}



export {
    Clear,
    Background,
    Circle,
    Line, 
    DrawId,
    CircleGradient
}