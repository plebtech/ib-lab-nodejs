const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

const dataPath = path.join(__dirname, "popular-articles.json");
const POPULAR = [];

const wipe = () => {
    fs.writeFile(dataPath, '', err => {
        if (err) console.log(err);
        console.log('cache purged. \n');
    })
}

// Extract from each article title, url, and author
// Push each extracted article to an array.
// Write the array to a file in the root of your project called popular-articles.json.

// fetches popular articles from reddit and pushes them to an internal array.
const fetch = () => rp('https://reddit.com/r/popular.json', (err, res, body) => {
    let count = 0;
    if (err) {
        console.log(err);
    } else {
        JSON.parse(body).data.children.forEach(item => {
            let article = {
                id: count,
                title: item.data.title,
                url: item.data.url,
                author: item.data.author,
            }
            POPULAR.push(article);
            count++;
        })
    }
    console.log(POPULAR);
});

wipe();
fetch();