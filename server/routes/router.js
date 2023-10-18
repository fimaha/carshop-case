const express = require('express')
const router = express.Router()
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const db = getFirestore();

const data = require('./data.json');


router.post('/login', (req, res) => {
    const { email, password } = req.body

    console.log(email + '-' + password)
    res.send('Successfully logged in.')
})

router.post('/account', async (req, res) => {
    const { name, surname, email, password } = req.body;
    const data = {
        name: name,
        surname: surname,
        email: email,
        password: password,
    };

    try {
        await setDoc(doc(db, 'accounts', email), data);
        res.send('Successfully created account.');
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).send('Error creating account');
    }
});

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