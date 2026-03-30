function getGreeting() {
    let lastName = null;
    let lastResult = null;

    return function(name) {
        if (name === lastName) {
            console.log("5) Cached value");
            return lastResult;
        }
        lastName = name;
        lastResult = `Hello ${name}`;
        return lastResult;
    };
}

const greet = getGreeting();
console.log(greet("Jaina"));
console.log(greet("Jaina"));