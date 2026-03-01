function loadUsers(ids) {
    const promises = ids.map(id => getUser(id).catch(err => ({ error: err.message, id })));
    return Promise.all(promises);
}

loadUsers([0, 1, 5]).then(results => console.log("5) Loaded users:", results));