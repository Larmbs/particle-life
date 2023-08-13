import * as draw from './render.js'
import {Vec} from './vector2d.js'
import {window_height, window_width} from './settings.js';

class Particle {
    constructor(x, y, vx, vy, gravity, w, color, type, r) {
        this.pos = new Vec(x,y)
        this.speed = new Vec(vx,vy)
        this.gravity = gravity
        this.w = w
        this.color = color
        this.type = type
        this.coll - false
        this.r = r
    }

    update(pList) {
        this.uCircle(pList)
    }

    uCircle(pList) {
        this.speed.sDivide(1)
        
        this.speed.subtract(new Vec(this.gravity.x * this.w, this.gravity.y * this.w))
        this.pColl(pList)
        this.wallBounce()
        
        
        
        this.pos.add(this.speed)
        if (this.coll === false) {
            draw.Circle(this.color, this.r, this.pos, 1, 0)
        } else {
            draw.Circle('red', this.r, this.pos, 1, 0)
        }
        
    }

    wall() {
        if (Math.abs(this.pos.x + this.speed.x) > window_width / 2 - 50) {
            this.speed.x = 0
            this.pos.x = (window_width-100)/2 * Math.sign(this.pos.x + this.speed.x)
        }
    
        if (Math.abs(this.pos.y + this.speed.y) > window_height / 2 - 50) {
            this.speed.y = 0
            this.pos.y = (window_height-100)/2 * Math.sign(this.pos.y + this.speed.y)
        }
    }

    wallBounce() {
        if (Math.abs(this.pos.x + this.speed.x) > window_width / 2 - 50) {
            this.speed.x /= -1.5
            if (Math.abs(this.speed.y) < 1) {
                this.speed.y = 0
            } else {
                this.speed.y /= 1.1
            }
        }
    
        if (Math.abs(this.pos.y + this.speed.y) > window_height / 2 - 50) {
            this.speed.y /= -1.5
            if (Math.abs(this.speed.x) < 1) {
                this.speed.x = 0
            } else {
                this.speed.x /= 1.1
            }
        }
    }
    
    pColl(pList) {
        this.coll = false
        for (let i = 0; i < pList.length; i++) {
            let pp = pList[i].pos
            let ps = pList[i].speed
      
            let d = this.pos.distance(pp)
    
            if (d <= this.r + pList[i].r && d != 0) {
                this.col = true
                let un = new Vec(this.pos.x - pp.x, this.pos.y - pp.y)
                un.normalize()
                let ut = new Vec(un.x, un.y)
                ut.perp()

                 let a = this.speed
                 let b = ps

                 let a_n = a.dot(un)
                 let b_n = b.dot(un)
                 let a_t = a.dot(ut)
                 let b_t = b.dot(ut)


                 let r1 = 5
                 let r2 = 5
                 let a_n_final = (a_n * (r1-r2) + 2 * r2 * b_n) / (r1+r2)
                 let b_n_final = (b_n * (r2-r1) + 2 * r1 * a_n) / (r1+r2)
                
                 let a_n_after = new Vec(un.x * a_n_final, un.y * a_n_final)
                 let b_n_after = new Vec(un.x * b_n_final, un.y * b_n_final)
                 let a_t_after = new Vec(ut.x * a_t, ut.y * a_t)
                 let b_t_after = new Vec(ut.x * b_t, ut.y * b_t)
                
                 a_n_after.add(a_t_after)
                 b_n_after.add(b_t_after)
                 
                 this.speed.equal(a_n_after)
                 pList[i].speed.equal(b_n_after)
            }
            
        }
        
    }
}


export {Particle}