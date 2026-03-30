function cacheFor10Seconds(fn) {
    let lastArgs = null;
    let lastResult = null;
    let lastTime = 0;

    return function(...args) {
        const now = Date.now();

        if (
            lastArgs &&
            JSON.stringify(args) === JSON.stringify(lastArgs) &&
            now - lastTime < 10000
        ) {
            console.log("11) Cached value");
            return lastResult;
        }

        lastArgs = args;
        lastResult = fn(...args);
        lastTime = now;

        return lastResult;
    };
}

function power(a, b) {
    console.log("Calculating...");
    return a ** b;
}

const cachedPower = cacheFor10Seconds(power);

console.log(cachedPower(2, 5));
console.log(cachedPower(2, 5));