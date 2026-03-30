const characters = [
    { name: "arthas" },
    { name: "thrall" },
    { name: "jaina" }
];

const capitalized = characters.map(obj => ({
    ...obj,
    name: obj.name.charAt(0).toUpperCase() + obj.name.slice(1)
}));

console.log("8)", capitalized);