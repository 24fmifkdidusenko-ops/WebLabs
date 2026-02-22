
const persons = [
    { name: 'Thrall', age: 30, city: 'Orgrimmar' },
    { name: 'Jaina', age: 28, city: 'Theramore' },
    { name: 'Arthas', age: 32, city: 'Lordaeron' },
    { name: 'Sylvanas', age: 29, city: 'Undercity' },
    { name: 'Illidan', age: 35, city: 'Outland' },
];


persons.groupName = 'A';
persons.teacher = 'Medivh';
persons.year = '2023';

console.log('--- Task 1: Array elements ---');
for (let i = 0; i < persons.length; i++) console.log(persons[i]);
for (const person of persons) console.log(person);
console.log('--- Array properties ---');
for (const key in persons) {
    if (!Number.isNaN(Number(key))) continue; 
    console.log(`${key}: ${persons[key]}`);
}


const defaults = { mode: 'test', debugLevel: 'error', logFolder: 'root' };
const userSetting = { mode: 'production', debugLevel: 'trace' };


const merged1 = Object.assign({}, defaults, userSetting);

const merged2 = { ...defaults, ...userSetting };

const merged3 = {};
for (const key in defaults) merged3[key] = defaults[key];
for (const key in userSetting) merged3[key] = userSetting[key];

console.log('--- Task 2: Merged objects ---');
console.log(merged1, merged2, merged3);


Object.defineProperty(persons[0], 'birthYear', {
    get: function() { return new Date().getFullYear() - this.age; },
    configurable: false,
    enumerable: true
});
console.log('--- Task 3: Birth year ---');
console.log(persons[0].birthYear);


const arr1 = ['Orc','Human','Elf'];
const arr2 = ['Undead','Night Elf','Demon'];
const mergedArr1 = arr1.concat(arr2);
const mergedArr2 = [...arr1, ...arr2];
const mergedArr3 = [...arr1]; mergedArr3.push(...arr2);
console.log('--- Task 4: Merged arrays ---');
console.log(mergedArr1, mergedArr2, mergedArr3);


const fragments = persons.map(p => `${p.name} from ${p.city} born in ${new Date().getFullYear() - p.age}`);
console.log('--- Task 5: Text fragments ---');
console.log(fragments);


const over20 = persons.filter(p => p.age > 20);
console.log('--- Task 6: Age > 20 ---');
console.log(over20);


const { name, city } = persons[0];
console.log('--- Task 7: Destructuring ---');
console.log(name, city);

const [firstPerson] = persons;
console.log(firstPerson);


function getUserData(name) {
    const user = persons.find(p => p.name === name);
    if (!user) throw new Error('Unable to find user');
    return user;
}

function showUserInfo(name) {
    console.log('Loading');
    try {
        const user = getUserData(name);
        console.log(user);
    } catch (err) {
        console.log(err.message);
    } finally {
        console.log('Loading finished');
    }
}

console.log('--- Task 8: getUserData/showUserInfo ---');
showUserInfo('Thrall'); 
showUserInfo('Guldan'); 


function textToArray(text) {
    return [...text];
}
console.log('--- Task 9: Text to letters ---');
console.log(textToArray('Orgrimmar'));


function reverseLetters(word) {
    return [...word].reverse().join('');
}
console.log('--- Task 10: Reverse letters ---');
console.log(reverseLetters('Lordaeron'));


function isJSFile(filename) {
    return filename.endsWith('.js');
}
console.log('--- Task 11: JS file check ---');
console.log(isJSFile('script.js')); 
console.log(isJSFile('style.css')); 


function sentenceToWords(sentence) {
    return sentence.split(' ');
}
console.log('--- Task 12: Sentence to words ---');
console.log(sentenceToWords('For the Horde!'));

function replaceWord(text, oldWord, newWord) {
    return text.replace(oldWord, newWord); 
}
console.log('--- Task 13: Replace word ---');
console.log(replaceWord('I love Warcraft', 'Warcraft', 'WoW'));