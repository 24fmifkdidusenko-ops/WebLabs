function logCall(callback) {
    return new Promise(resolve => {
        setTimeout(() => {
            const time = new Date().toLocaleTimeString();
            console.log(`6) Function: ${callback.name} called at ${time}`);
            resolve(callback());
        }, 1000);
    });
}

logCall(() => console.log("Task A"))
    .then(() => logCall(() => console.log("Task B")))
    .then(() => logCall(() => console.log("Task C")))
    .then(() => logCall(() => console.log("Task D")));