const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

const dataPath = path.join(__dirname, "popular-articles.json");

const wipe = () => {
    fs.writeFile(dataPath, '', err => {
        if (err) console.log(err);
        console.log('cache purged. \n');
    })
}

const fetch = () => rp('https://reddit.com/r/popular.json', (err, res, body) => {
    if (err) {
        console.log(err);
    } else {
        JSON.parse(body).data.children.forEach(item => {
            fs.appendFileSync(dataPath,item.data.title + '\n');
        })
    }
});

wipe();