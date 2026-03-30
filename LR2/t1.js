function average(...numbers) {
    if (numbers.length === 0) return 0;

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}


console.log(average(10, 20, 30));    
console.log(average(5, 15, 25, 35));  