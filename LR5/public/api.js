
const users = Array.from({ length: 20 }, (_, i) => ({
    firstname: `User${i+1}`,
    lastname: `Last${i+1}`,
    score: Math.floor(Math.random() * 101)
}));


function fetchUsers() {
    return new Promise(resolve => {
        setTimeout(() => {
            const shuffled = users.sort(() => 0.5 - Math.random());
            resolve(shuffled.slice(0, 10));
        }, 1000);
    });
}

function getNewUsers() {
    return users.slice(0, 5);
}