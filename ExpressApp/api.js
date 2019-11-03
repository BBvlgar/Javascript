const express = require('express');
const router = express.Router();

const users = [
    {name:"pesho", age: 3},
    {name:"Ghosho", age: 4},
]
    
router.get('/user', (req, res) => {
    res.send(users)
})

router.get('/user/:id', (req, res) => {

    const user = users.find(u => u.id === +req.params.id)
    res.send(users)
})

module.exports = router;
