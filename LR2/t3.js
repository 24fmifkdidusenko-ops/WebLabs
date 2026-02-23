function callWithContext(obj, callback) {
    callback.call(obj);
}

const person = {
    name: "Arthas",
    age: 30
};

function birthdayMessage() {
    const date = new Date().toDateString();
    console.log(`3) Today is ${date}! Happy birthday ${this.name}`);
}

callWithContext(person, birthdayMessage);
