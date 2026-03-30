const args = process.argv.slice(2);
const sum = args.reduce((acc, val) => acc + Number(val), 0);
console.log(`Sum = ${sum}`);