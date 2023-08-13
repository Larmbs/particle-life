import {Vec} from './vector2d.js'
import * as draw from './render.js'
import {Particle} from './particleHandler.js'
import {window_height, window_width} from './settings.js';

var g = new Vec(0, -0.5)

let pCount = 50

let pList = []
for (let i = 0; i < pCount; i++) {
    pList.push(new Particle(Math.random() * (window_width - 100) - (window_width-100)/2, Math.random() * (window_height - 100) - (window_height-100)/2, Math.random() * 20 - 10, Math.random() * 20 - 10, g, 1, 'blue', 'blue', 20))
}
for (let i = 0; i < pCount; i++) {
    pList.push(new Particle(Math.random() * (window_width - 100) - (window_width-100)/2, Math.random() * (window_height - 100) - (window_height-100)/2, Math.random() * 20 - 10, Math.random() * 20 - 10, g, 1, 'red', 'blue', 10))
}
for (let i = 0; i < pCount; i++) {
    pList.push(new Particle(Math.random() * (window_width - 100) - (window_width-100)/2, Math.random() * (window_height - 100) - (window_height-100)/2, Math.random() * 20 - 10, Math.random() * 20 - 10, g, 1, 'green', 'blue', 15))
}






let count = 0
function mainLoop() {
    count++
    draw.Clear()
    
    for (let i = 0; i < pList.length; i++) {
        pList[i].update(pList)
    }

    if (count % 100 === 0.5) {
        g.x = Math.random() - 0.5
        g.y = Math.random() - 0.5
    }
    

    requestAnimationFrame(mainLoop)
}

mainLoop()
