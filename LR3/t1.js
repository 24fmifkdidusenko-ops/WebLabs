function invokeAfterDelay(fn, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fn());
        }, delay);
    });
}

invokeAfterDelay(() => Math.floor(Math.random() * 11), 1000)
    .then(result => console.log("1) Random number:", result));