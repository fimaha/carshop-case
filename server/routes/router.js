const express = require('express')
const router = express.Router()

const data = require('./data.json');

router.post('/login', (req, res) => {
    const { email, password } = req.body

    console.log(email + '-' + password)
    res.send('Successfully logged in.')
})

// router.get('/users', (req, res) => {
//     const userData = require('data.json');
//     // TODO wrong path for data
// })
router.get('/employees', (req, res) => {
    const employees = data.carshop.employees;
    res.json(employees);
});

router.get('/carmodels', (req, res) => {
    const carmodels = data.carshop.carmodels;
    res.json(carmodels);
});




module.exports = router