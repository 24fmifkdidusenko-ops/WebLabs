/**
 * REPOSITORY SIMULATOR
 */
const Repository = (function () {
    const _db = {
        'app-root': { id: 'app-root', size: 100, content: '111', deps: ['auth-mod', 'ui-lib'] },
        'auth-mod': { id: 'auth-mod', size: 50, content: 'console.log("password >:D")', deps: ['crypto-utils', 'test1'] }, // !
        'ui-lib': { id: 'ui-lib', size: 200, content: '333', deps: ['icon-set', 'test2', 'canvas-api'] },
        'crypto-utils': { id: 'crypto-utils', size: 30, content: '444', deps: ['wasm-core'] },
        'canvas-api': { id: 'canvas-api', size: 80, content: '555', deps: ['wasm-core'] },
        'icon-set': { id: 'icon-set', size: 20, content: '666', deps: [] },
        'wasm-core': { id: 'wasm-core', size: 500, content: '777', deps: [] },
        'test1': { id: 'test1', size: 3, content: 't1', deps: ['test2'] }, // !
        'test2': { id: 'test2', size: 5, content: 't2', deps: ['test1'] }, // !
    };

    return {
        getScriptInfo: (id) => new Promise((resolve, reject) => {
            console.log(`API Request: ${id}`);
            const isServerDown = Math.random() < 0.01;
            setTimeout(() => {
                if (isServerDown) return reject(new Error('Server is unavailable'));
                _db[id] ? resolve(_db[id]) : reject(new Error(`Script ${id} not found.`));
            }, 1000 + Math.random() * 3000);
        })
    };
})();


async function getBuildSize(scriptId) {
    const visited = new Set();
    async function getBuildSizeInternal(scriptId) { 
        if (visited.has(scriptId)) return 0;
        visited.add(scriptId);
        const script = await getScript(scriptId);

        const sizePromises = [];
        let scriptSize = script.size;

        script.deps.forEach(id => {
            sizePromises.push(getBuildSizeInternal(id));
        });

        const sizes = await Promise.all(sizePromises)
        sizes.forEach(s => scriptSize += s);

        return scriptSize;
    }
    const result = await getBuildSizeInternal(scriptId);
    visited.clear();
    return result;
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function getScript(scriptId, retries = 3, backoff = 500) {
    try {
        return await Repository.getScriptInfo(scriptId);
    } catch (e) {
        if (retries > 0 && e.message === "Server is unavailable") {
            console.log(`Retrying ${scriptId} in ${backoff} ms... ${retries - 1} more attempts.`);
            await delay(backoff);
            return getScript(scriptId, retries - 1, backoff * 2);
        }
        
        else throw e;
    }
} 


const dbIntegrity = new Map([
    ['app-root', 'sha256-111'],
    ['auth-mod', 'sha256-222'],
    ['ui-lib', 'sha256-333'],
    ['crypto-utils', 'sha256-444'],
    ['canvas-api', 'sha256-555'],
    ['icon-set', 'sha256-666'],
    ['wasm-core', 'sha256-777'],
    ['test1', 'sha256-t1'],
    ['test2', 'sha256-t2']
]); 

function verifyIntegrity(script) {
    const expected = dbIntegrity.get(script.id);
    if (!expected) throw new Error(`${script.id} is not in Integrity list.`);

    const actual = `sha256-${script.content}`; 
    if (actual !== expected) throw new Error(`Integrity check failed for ${script.id}`);

    return true;
}

async function loadScripts(ids) {
    const idsArr = [...ids]; // if we get set
    const promises = [];
    const results = [];

    const limit = 3;
    let index = 0;

    const cache = new Map();

    async function thread() { 
        while (index < idsArr.length) { 
            const currentIndex = index++;
            const id = idsArr[currentIndex]

            let script;
            if (cache.has(id)) script = cache.get(id);
            else {
                script = await getScript(id);
                try {
                    verifyIntegrity(script);
                    cache.set(id, script);
                } catch (e) {
                    cache.delete(id); 
                    throw e;
                }
            }

            results[currentIndex] = script;
        }
    }

    for (let i = 0; i < limit; i++) promises.push(thread());
    await Promise.all(promises);

    const scripts = results.map(res => ({ id: res.id, content: res.content }));
    return scripts;
} 

/**
 * TEST RUNNER
 */
async function runTest1() {
    const EXPECTED_SIZE = 988; // 980 + test1 and test2
    const START_TIME = Date.now();

    console.log("Starting calculation for 'app-root'...");

    try {
        const result = await getBuildSize('app-root');
        const duration = ((Date.now() - START_TIME) / 1000).toFixed(2);

        console.log("\n--- TEST RESULTS ---");
        console.log(`Result: ${result}kb`);
        console.log(`Duration: ${duration}s`);

        if (result === EXPECTED_SIZE) {
            console.log("PASS");
        } else if (result === 1480) {
            console.log("SEMI-PASS");
        } else {
            console.log(`FAIL: Expected ${EXPECTED_SIZE}kb but got ${result}kb.`);
        }

    } catch (e) {
        console.error(`\nTEST CRASHED: ${e.message}`);
    }
}


async function runTest2() {
    const idsGood = ["icon-set", "wasm-core", "app-root", "test1", "test2", "test1", "test2", "test1"];
    const idsSet = new Set(["auth-mod", "icon-set", "wasm-core", "app-root"]);
    const idsBad = ["crypto-utils", "error", "app-root"];

    try {
        console.log("Test 1. Array of Good ids: ", idsGood);
        const res1 = await loadScripts(idsGood);
        console.log("\nResult:", res1);
    } catch (e) { console.error(`\nTEST 1 CRASHED: ${e.message}`); }

    try {
        console.log("\nTest 2. Set of ids: ", idsSet);
        const res2 = await loadScripts(idsSet);
        console.log("\nResult:", res2);

    } catch (e) { console.error(`\nTEST 2 CRASHED: ${e.message}`); }

    try {
        console.log("\nTest 3. Array of Bad ids: ", idsBad);
        const res3 = await loadScripts(idsBad);
        console.log("\nResult:", res3);
    } catch (e) { console.error(`\nTEST 3 CRASHED: ${e.message}`); }
}

//runTest1();
//runTest2();