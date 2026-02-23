function logCall(callback, ...args) {
    const time = new Date().toLocaleTimeString();
    console.log(`10) Function: ${callback.name}`);
    console.log("Args:", args);
    console.log("Time:", time);

    return callback(...args);
}

function multiply(a, b) {
    return a * b;
}

console.log("Result:", logCall(multiply, 4, 5));