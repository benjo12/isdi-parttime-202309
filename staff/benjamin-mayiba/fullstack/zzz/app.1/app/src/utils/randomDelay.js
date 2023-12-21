function randomDelay(callback) {
    setTimeout(callback, Math.round(Math.random() * 100))
}

export default randomDelay