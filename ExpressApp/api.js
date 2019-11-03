const express = require('express')
const router = express.Router();

const users = [{name:'Pesho', age:3},{name:'Ivan', age:4}]

router.get('/user', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

router.post('/user', (req, res) => {

    console.log(req.body)

})

router.get('/user/:age', (req, res) => {

    let names = users.find( u => u.age === +req.params.age)
        console.log(names)

        res.send(names.name + " " + names.age)
})

module.exports = router;
