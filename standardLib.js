function random(start, end, output) {
    let d = (Math.abs(start) + Math.abs(end))
    let r = Math.random() * d - Math.abs(start)

    if (output === 'int') {
        r = Math.floor(r)
    }
    return r
}

export {random}