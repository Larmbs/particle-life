import * as draw from './render.js'
import {Vec} from './vector2d.js'
import {windowSize, simB} from './settings.js'
import {Color} from './color.js'

class Particle {
    constructor(pos, speed, gravity, w, color, type, r, a, bounce) {
        this.pos = pos
        this.speed = speed
        this.gravity = gravity
        this.w = w
        this.color1 = new Color(color[0], color[1], color[2], 1)
        this.color2 = this.color1.newColorOff(100)
        this.type = type
        this.col = true
        this.m = true
        this.r = r
        this.a = a
        this.bounce = bounce
        this.f = 1.1
    }

    update(pList, colorStep) {
        this.uCircle(pList)
        if (colorStep) {
            this.color1.colorStep(1)
            this.color2.colorStep(1)
        }
    }

    uCircle(pList) {
        this.speed.sDivide(this.f)
        
        this.speed.subtract(new Vec(this.gravity.x * this.w, this.gravity.y * this.w))
        this.pColl(pList)
        this.wallBounce()

        this.a = Math.atan2(this.speed.x, -this.speed.y)

        this.pos.add(this.speed)
    
        //draw.Circle(this.color1.colorRGBA(), this.r, this.pos, 1, this.a, this.a + Math.PI)
        //draw.Circle(this.color2.colorRGBA(), this.r, this.pos, 1, this.a - Math.PI, this.a)

        draw.Circle(this.color1.colorRGBA(), this.r, this.pos, 1, 0, Math.PI*2)

     
        
        
    }
    wallTel() {
        if (Math.abs(this.pos.x + this.speed.x) > simB.x) {
            this.pos.x += -(windowSize.x) * Math.sign(this.pos.x)
            this.speed.x *= 0.9
        }

        if (Math.abs(this.pos.y + this.speed.y) > simB.y) {
            this.pos.y += -(windowSize.y) * Math.sign(this.pos.y)
            this.speed.y *= 0.9
        }


    }
    wall() {
        if (Math.abs(this.pos.x + this.speed.x) > simB.x) {
            this.speed.x = 0
            this.pos.x = simB.x * Math.sign(this.pos.x + this.speed.x)
        }
    
        if (Math.abs(this.pos.y + this.speed.y) > simB.y) {
            this.speed.y = 0
            this.pos.y = simB.y * Math.sign(this.pos.y + this.speed.y)
        }
    }

    wallBounce() {
        if (Math.abs(this.pos.x + this.speed.x) > simB.x) {
            this.speed.x /= -this.bounce
            if (Math.abs(this.speed.y) < 1) {
                this.speed.y = 0
            } else {
                this.speed.y /= this.f
            }
        }
    
        if (Math.abs(this.pos.y + this.speed.y) > simB.y) {
            this.speed.y /= -this.bounce
            if (Math.abs(this.speed.x) < 1) {
                this.speed.x = 0
            } else {
                this.speed.x /= this.f
            }
        }
    }
    
    pColl(pList) {
        let correction = new Vec(0,0)
        
        for (let i = 0; i < pList.length; i++) {
            let pp = pList[i].pos
            let ps = pList[i].speed
      
            let d = this.pos.distance(pp)
            let dif = this.r + pList[i].r

            if (d <= dif && d !== 0) {
                if (this.col === true) {
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


                    let w1 = this.w
                    let w2 = pList[i].w
                    let a_n_final = (a_n * (w1-w2) + 2 * w2 * b_n) / (w1+w2)
                    let b_n_final = (b_n * (w2-w1) + 2 * w1 * a_n) / (w1+w2)
                
                    let a_n_after = new Vec(un.x * a_n_final, un.y * a_n_final)
                    let b_n_after = new Vec(un.x * b_n_final, un.y * b_n_final)
                    let a_t_after = new Vec(ut.x * a_t, ut.y * a_t)
                    let b_t_after = new Vec(ut.x * b_t, ut.y * b_t)
                
                    a_n_after.add(a_t_after)
                    b_n_after.add(b_t_after)
                    a_n_after.subtract(this.speed)
                    b_n_after.subtract(ps)

                    if (Math.abs(this.pos.x) <= simB.x - this.t) {
                        this.pos.x += un.x
                    }
                    if (Math.abs(this.pos.y) <= simB.y - this.r) {
                        this.pos.y += un.y
                    }
                    
                    this.speed.add(a_n_after)
                    pList[i].speed.add(b_n_after)
                }
            } else if (d <= dif * 7 && d >= dif * 1.1 && d !== 0 && this.m === true) {
                let pull = new Vec(this.pos.x - pp.x, this.pos.y - pp.y)
                pull.normalize()
                let magW = (this.w + pList[i].w) * 2
                if (d <= dif * 3) {
                    pull.sMultiply((1/(d)) * magW)
                } else {
                    pull.sMultiply((-1/(d)) * magW/2)
                }
                this.speed.add(pull)
            }
            
        }
        
    }
}


export {Particle}