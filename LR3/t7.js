async function showUsers(ids) {
    console.log("7) loading");
    try {
        const users = await loadUsers(ids);
        console.log("7) Users:", users);
    } catch (err) {
        console.log("7) Error:", err.message);
    } finally {
        console.log("7) loading finished");
    }
}


showUsers([0, 2, 3, 7]);