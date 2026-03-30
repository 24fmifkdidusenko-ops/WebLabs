function sum(a) {
    return function(b) {
        return a + b;
    };
}

console.log("6)", sum(5)(10));
console.log("6)", sum(3)(7));