function produceRandomAfterDelay(delay) {
    return invokeAfterDelay(() => Math.floor(Math.random() * 11), delay);
}

Promise.all([produceRandomAfterDelay(1000), produceRandomAfterDelay(1500)])
    .then(([a, b]) => console.log("2) Sum of two random numbers:", a + b));