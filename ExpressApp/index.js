const express = require('express');
const api = require('./api');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'));

app.use('/api', api)


app.get('/', (req, res) => {

    res.send()

}).listen(port)
