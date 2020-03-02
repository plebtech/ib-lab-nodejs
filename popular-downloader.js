const path = require('path');
const fs = require('fs');
const rp = require('request-promise');
const rq = require('request');

const dataPath = path.join(__dirname, '/downloads/');
const POPULAR = [];

// fetches popular articles from reddit and pushes them to an internal array.
// returns a promise so that it can be used asynchronously.
const fetch = () => rp('https://reddit.com/r/popular.json', (err, res, body) => {
    let count = 0;
    if (err) {
        console.log(err);
        return err;
    } else {
        JSON.parse(body).data.children.forEach(item => {
            let article = {
                internalId: count,
                id: item.data.id,
                title: item.data.title,
                url: item.data.url,
                author: item.data.author,
            }
            POPULAR.push(article);
            count++;
        });
    }
    return res;
});

// once the popular articles are included in the array, check if each is an image; if so, download it.
const download = () => {
    try {
        POPULAR.forEach(item => {
            let ext = path.extname(item.url);
            if ((ext === '.jpg') || (ext === '.gif') || (ext === '.png')) {
                const options = {
                    uri: item.url,
                    encoding: null
                };
                const filepath = dataPath + item.id + ext;
                rq(item.url).pipe(fs.createWriteStream(filepath));
                console.log(item.url + ' written to ' + filepath);
            };
        });
        console.log('done.');
    }
    catch (err) {
        console.log(err);
    }
}

// do it.
const run = async () => {
    await fetch();
    download();
}
run();