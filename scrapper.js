const parser = require('./index');

async function start() {
    try {
        const ads = await parser('http://sait1/');
        console.log('parse success');
    } catch (e) {
        console.log(e);
    }
    process.exit(0);
}

start();