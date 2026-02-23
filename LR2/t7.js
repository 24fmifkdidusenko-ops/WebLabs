function createChecker(array) {
    return function(text) {
        return array.includes(text);
    };
}

const heroes = ["Thrall", "Illidan", "Sylvanas"];
const checkHero = createChecker(heroes);

console.log("7)", checkHero("Thrall"));
console.log("7)", checkHero("Anduin"));