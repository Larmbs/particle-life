class Color {
    constructor(r, g, b, a) {
        if (typeof r === 'string') {
            this.r = 15
            this.g = 35
            this.b = 150
            this.a = 1
        } else {
            this.r = r
            this.g = g
            this.b = b
            this.a = a
        }
        this.type = 'color'
    }

    colorStep(factor) {
        this.r += factor 
        this.g += factor
        this.b += factor
        
    }

    colorRGBA() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`
    }

    newColorOff(off) {
        return new Color(this.r + off, this.g + off, this.b + off, this.a)
    }
}

export {Color}