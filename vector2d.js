import {random} from "./standardLib.js"

class Vec {
    constructor(x, y, rand) {
        if (rand) {
            this.x = random(-x, x)
            this.y = random(-y, y)
            this.type = 'v2d'
        } else {
            this.x = x
            this.y = y
            this.type = 'v2d' 
        }
    
    }

    equal(e) {
        if (typeof e == 'number') {
            this.x = e
            this.y = e
        }
        else {
            this.x = e.x
            this.y = e.y
        }
    }

    add(vec) {
        this.x += vec.x
        this.y += vec.y
    }

    subtract(vec) {
        this.x -= vec.x
        this.y -= vec.y
    }

    multiply(vec) {
        this.x *= vec.x
        this.y *= vec.y
    }

    divide(vec) {
        this.x /= vec.x
        this.y /= vec.y
    }
    
    sAdd(n) {
        this.x += n
        this.y += n
    }

    sSubtract(n) {
        this.x -= n
        this.y -= n
    }

    sMultiply(n) {
        this.x *= n
        this.y *= n
    }

    sDivide(n) {
        this.x /= n
        this.y /= n
    }

    normalize() {
        let m = this.magnitude()
        this.x /= m
        this.y /= m
    }

    magnitude() {
        return Math.sqrt(this.x**2 + this.y**2)
    }

    distance(vec) {
        return Math.sqrt((this.x - vec.x)**2 + (this.y - vec.y)**2)
    }

    inverse() {
        this.x = 1/this.x
        this.y = 1/this.y
    }

    cap(bounds) {
        if (Math.abs(this.x) > bounds) {
            this.x /= 2
        }
        if (Math.abs(this.y) > bounds) {
            this.y /= 2
        }
    }

    dot(vec) {
        return (this.x * vec.x) + (this.y * vec.y)
    }

    similarity(vec) {
        return
    }

    perp() {
        let x = this.x
        this.x = -this.y
        this.y = x
    }

    angle() {

    }

    returnNorm() {
        let m = this.magnitude()
        return new Vec(this.x / m, this.y / m)
    }


    }


export {Vec}