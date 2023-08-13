import {Vec} from './vector2d.js'
import * as draw from './render.js'
import {Particle} from './particleHandler.js'
import {hwindowSize, simB} from './settings.js'

var g = new Vec(0, 0)
let pCount = 60
let pList = []
for (let i = 0; i < pCount/3; i++) {
    pList.push(new Particle(new Vec(simB.x, simB.y, true), new Vec(-10, 10, true), g, 1, [150,0,0], 'none', 10, 0, 2))
}
for (let i = 0; i < pCount/3; i++) {
    pList.push(new Particle(new Vec(simB.x, simB.y, true), new Vec(-10, 10, true), g, 2, [0,0,150], 'none', 10, 0, 2))
}
for (let i = 0; i < pCount/3; i++) {
    pList.push(new Particle(new Vec(simB.x, simB.y, true), new Vec(-10, 10, true), g, 3, [0,150,0], 'none', 10, 0, 2))
}

let count = 0
var msPrev = window.performance.now()

const msPerFrame = 1000 / 60
let frames = 0
let frameRate = 0
function mainLoop() {
    count++
    draw.Clear()
    
    for (let i = 0; i < pList.length; i++) {
        if (count % 5 === 0) {
            pList[i].update(pList, false)
        } else {
            pList[i].update(pList, false)
        } 
    }

    window.requestAnimationFrame(mainLoop)
    const msNow = window.performance.now()
    const msPassed = msNow - msPrev

    if (msPassed < msPerFrame) return

    const excessTime = msPassed % msPerFrame
    msPrev = msNow - excessTime
    draw.DrawId(frameRate, -hwindowSize.x, -hwindowSize.y + 50)
    frames++
    
}

setInterval(() => {
    frameRate = frames
    
    frames = 0
  }, 1000)

mainLoop()
