const [operation, ...nums] = process.argv.slice(2);
const [a, b] = nums.map(Number);

let result;

switch(operation) {
    case 'add': result = a + b; break;
    case 'sub': result = a - b; break;
    case 'mul': result = a * b; break;
    case 'div': result = a / b; break;
    default: console.log("Unknown operation"); process.exit(1);
}

console.log(`Result = ${result}`);