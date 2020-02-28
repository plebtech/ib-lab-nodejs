const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, "../chirps.json");

const HARD_CODED_CHIRPS = [
    {
        id: 1,
        account: '@BillyBob',
        date: 'Sun Nov 10 2011 9:05:10 GMT-0600 (Central Standard Time)',
        content: 'YEEEHAWW',
    },
    {
        id: 2,
        account: '@trump',
        date: 'Fri Jan 1 2013 02:55:51 GMT-0600 (Central Standard Time)',
        content: 'covfefe',
    },
    {
        id: 3,
        account: '@qwertyuiop',
        date: 'Tue May 16 2014 9:15:11 GMT-0600 (Central Standard Time)',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, hic!',
    },
    {
        id: 4,
        account: '@qwertyuiop',
        date: 'Tue May 17 2014 9:15:11 GMT-0600 (Central Standard Time)',
        content: 'spam Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, hic!',
    },
    {
        id: 5,
        account: '@qwertyuiop',
        date: 'Tue May 18 2014 9:15:11 GMT-0600 (Central Standard Time)',
        content: 'lmao more spam Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, hic!',
    },
]

const initHCC = () => {
    fs.writeFile(dataPath, JSON.stringify(HARD_CODED_CHIRPS), err => {
        if (err) console.log(err);
        console.log('written. \n');
    });
}

initHCC();

const consoleLogChirps = () => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) console.log(err);
        JSON.parse(data).forEach(chirp => {
            console.log(chirp.id);
            console.log(chirp.account);
            console.log(chirp.date);
            console.log(chirp.content);
            console.log('\n');
        })
    });
}

consoleLogChirps();