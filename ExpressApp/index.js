const express = require('express');
const router = require('./api.js');

const port = 3000;
const app = express();


app.use('/u', router)
app.get('/', (req, res) => {

    res.send('Hello world!');

})

app.listen(port , () => {

    console.log(`Server is listening ${port}`)
})


