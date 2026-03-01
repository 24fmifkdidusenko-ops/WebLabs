const usersDB = [
    { id: 0, name: "Thrall", age: 30, city: "Orgrimmar" },
    { id: 1, name: "Jaina", age: 28, city: "Theramore" },
    { id: 2, name: "Arthas", age: 32, city: "Lordaeron" },
    { id: 3, name: "Sylvanas", age: 29, city: "Undercity" }
];

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = usersDB.find(u => u.id === id);
            if (user) resolve(user);
            else reject(new Error("User not found"));
        }, 1000);
    });
}


getUser(2).then(u => console.log("4) Found user:", u))
           .catch(err => console.log(err.message));