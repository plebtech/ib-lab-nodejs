const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

const dataPath = path.join(__dirname, "popular-articles.json");
const POPULAR = [];

// blanks popular-articles.json in preparation of new articles being written.
// note: unused/unneeded due to writeFile() being used instead of appendFile();
const wipe = () => {
    fs.writeFile(dataPath, '', err => {
        if (err) {
            console.log(err);
        } else {
            console.log('cache purged.');
        }
    });
}

// fetches popular articles from reddit and pushes them to an internal array.
// returns promise so that it can be used asynchronously.
const fetch = () => rp('https://reddit.com/r/popular.json', (err, res, body) => {
    let count = 0;
    if (err) {
        console.log(err);
        return err;
    } else {
        JSON.parse(body).data.children.forEach(item => {
            POPULAR.push({
                id: count,
                title: item.data.title,
                url: item.data.url,
                author: item.data.author,
            });
            count++;
        });
    }
    return res;
});

// writes array of retrieved articles to popular-articles.json.
const write = () => {
    fs.writeFile(dataPath, JSON.stringify(POPULAR), err => {
        if (err) console.log(err);
        console.log('written.');
    });
}

// main function.
const scrape = async () => {
    // wipe();
    await fetch();
    write();
}
scrape();