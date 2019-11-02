const url = require('url')
const path = require('path')
const fs = require('fs')
const qs = require('querystring')
const breeds = require('../data/breeds')
const cats = require('../data/cats')
const formidable = require('formidable')

module.exports = (req, res) => {

    const pathnames = url.parse(req.url).pathname

    if( pathnames === '/cats/add-cat' && req.method === 'GET'){
        
        let filePath = path.normalize(path.join(__dirname,'../views/addCat.html'));
        const index= fs.readFile(filePath, (err, data) => {
        
            if(err){
                console.log(err);
                res.writeHead(404, { 'Content-Type': 'text/plain'})
                res.end("An error has occured 404")
                return;
            }

            let catBreedPl = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPl);
            res.writeHead(200, { 'Content-Type': "text/html"})
            res.write(modifiedData);
            res.end();
        });
    } else if( pathnames === '/cats/breed' && req.method === 'GET'){

        let filePath = path.normalize(path.join(__dirname,'../views/addBreed.html'));
        let index= fs.readFile(filePath, (err, data) => {
        
            if(err){
                console.log(err);
                res.writeHead(404, { 'Content-Type': 'text/plain'})
                res.end("An error has occured 404")
                return;
            }
            
            res.writeHead(200, { 'Content-Type': "text/html"})
            res.write(data);
            res.end();
        });
    }else if( pathnames === '/cats/breed' && req.method === 'POST'){
        let formData = '';
        req.on('data', (data) => {
            formData += data;
        })
        req.on('end', () => {
            let body = qs.parse(formData);
            fs.readFile('./data/breeds.json', (err,data) => {
                if(err){
                    throw err;
                }
                let breeds = JSON.parse(data);
                breeds.push(body.breed)
                let json = JSON.stringify(breeds);
                fs.writeFile('./data/breeds.json', json , 'utf-8', () => console.log('The breed was uploaded'))
            });
            res.writeHead(302, {'Location': '/'});
            res.end();
        })
    } else if(pathnames === '/cats/add-cat' && req.method === 'POST'){

        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {

            if(err){
                    throw err;
                }
                let formData = fields;
        
            fs.readFile('./data/cats.json', (err,data) => {
                if(err){
                    throw err;
                }
                let cats = JSON.parse(data);
                cats.push(formData)

                let json = JSON.stringify(cats);
                console.log(json)
                fs.writeFile('./data/cats.json', json , 'utf-8', () => console.log('The breed was uploaded'))
            });
            res.writeHead(302, {'Location': '/'});
            res.end();

        });
    }
}
