const express = require('express');
const api = require('./api.js');

const port = 3000;
const app = express();

app.use(express.static(__dirname + '/public'));

function defaultHandler (req, res){
    res.sendFile(__dirname + '/views/index.html');
}

app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
})

app.use('/api', api);

app.get('/',defaultHandler);

app.use( (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
})

app.listen(port , () => {

    console.log(`Server is listening ${port}`)
})


