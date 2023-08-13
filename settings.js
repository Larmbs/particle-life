import {Vec} from './vector2d.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const windowSize = new Vec(window.innerWidth, window.innerHeight)

canvas.width = windowSize.x;
canvas.height = windowSize.y;

const hwindowSize = new Vec(windowSize.x/2, windowSize.y/2)

const simB = new Vec(hwindowSize.x - 50, hwindowSize.y - 50)

export {
    canvas,
    ctx,
    windowSize,
    hwindowSize,
    simB
}