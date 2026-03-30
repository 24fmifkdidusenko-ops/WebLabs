function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function demoSleep() {
    console.log("3) Sleeping for 1 second...");
    await sleep(1000);
    console.log("3) Awake!");
}
demoSleep();