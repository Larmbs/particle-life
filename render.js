import {canvas, ctx, window_height, window_width} from './settings.js';
import * as vec from './vector2d.js'

function Clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function Background(color) {
    canvas.style.background = color;
};

function Circle(color, radius, vector, zoomLevel) {
    ctx.save();
    ctx.translate(window_width/2, window_height/2);
    ctx.scale(zoomLevel,zoomLevel);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(vector.x, vector.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function Tri(color, vector1, vector2, vector3, zoomLevel) {
    ctx.save()
    ctx.translate(window_width/2, window_height/2);
    ctx.scale(zoomLevel,zoomLevel);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(vector1.x, vector1.y);
    ctx.lineTo(vector2.x, vector2.y);
    ctx.lineTo(vector3.x, vector3.y);
    ctx.fill();
    ctx.restore();
}

function Line(color, width, vector1, vector2, zoomLevel) {
    ctx.save();
    ctx.translate(window_width/2, window_height/2);
    ctx.scale(zoomLevel,zoomLevel);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(vector1.x, vector1.y);
    ctx.lineTo(vector2.x, vector2.y);
    ctx.stroke();
    ctx.restore();
}

function LineFromPointAngle(color, width, vector, angle, zoomLevel) {
    ctx.save();
    ctx.translate(window_width/2, window_height/2);
    ctx.scale(zoomLevel,zoomLevel);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(vector.x, vector.y);
    ctx.lineTo(vector.x + Math.cos(angle) * 20, vector.x + Math.sin(angle) * 20);
    ctx.stroke();
    ctx.restore();
}

function Image(center, rotation, image, zoomLevel) {
    ctx.save();
    ctx.translate(window.innerWidth/2, window.innerHeight/2);
    ctx.rotate(rotation + (Math.PI / 2));
    ctx.scale(-1 * zoomLevel / 2,1 * zoomLevel / 2);
    ctx.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
    ctx.restore();
}

function DrawList(startPos, text, fontStyle, fillStyle, strokeStyle, textColor, sideSpace, betweenLineSpace, width, footer, header) {
    ctx.save();
    ctx.font = fontStyle;
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;

    //getting text height
    let match = fontStyle.match(/^\d+/)
    if (match) {
        var textHeight = parseInt(match[0]);
    }
      
    let height = text.length*(betweenLineSpace+textHeight) + textHeight + header + footer
    ctx.fillRect(startPos.x, startPos.y, width, height)
    ctx.strokeRect(startPos.x, startPos.y, width, height)
    ctx.fillStyle = textColor;
    for (let i = 0; i < text.length; i++) {
        ctx.fillText(text[i], startPos.x + sideSpace, startPos.y + i*(betweenLineSpace+textHeight) + textHeight + header);
    }
    ctx.restore();
}

export {
    Clear,
    Background,
    Circle,
    Tri,
    Line, 
    LineFromPointAngle,
    Image,
    DrawList
}