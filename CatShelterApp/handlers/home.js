const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats');

module.exports = (req, res) => {

    const pathname = url.parse(req.url).pathname

if(pathname === '/' && req.method === 'GET'){

    let filePath = path.normalize(
        path.join(__dirname, '../views/home/index.html')
    )
    let modifiedData = '';

    fs.readFile(filePath, (err, data) => {

        if (err){
            console.log(err);

            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.write('404 Not found');
            res.end();
            
            return;
        }
        console.log(cats)
        let modifiedCats = cats.map((cat) => `<li>
    <img src=https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg alt="${cat.name}">
    <h3>${cat.name}</h3>
    <p><span>Breed: </span>${cat.breed}</p>
    <p><span>Description: </span>${cat.description}</p>
    <ul class="buttons">
        <li class="btn edit"><a href="/cats-edit/${cat.name}">Change Info</a></li>
        <li class="btn delete><a href="/cats-find-new-home/${cat.name}">New Home</a></li>
        </ul>
        </li>`);
        let modifiedData = data.toString().replace('{{cats}}', modifiedCats);

        res.writeHead(200, { 'Content-Type': 'text/html'});

        res.write(modifiedData);
        res.end()

    })
} else {
    return true;
}
}
