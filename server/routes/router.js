const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');
const firebaseConfig = require("../firebaseConfig.json");

const express = require('express')
const router = express.Router()

initializeApp(firebaseConfig);
const db = getFirestore();

// const data = require('./data.json');


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const docRef = doc(db, 'accounts', email);
        const docSnapshot = await getDoc(docRef);
        const userData = docSnapshot.data();

        if (!userData) {
            res.status(401).send('Email not found.');
            return;
        }

        if (password === userData.password) {
            const userInfo = {
                name: userData.name,
                surname: userData.surname,
                email: email,
            };
            res.status(200).json(userInfo);
        } else {
            res.status(401).send('Incorrect password.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Error during login.');
    }
});

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
// router.get('/employees', (req, res) => {
//     const employees = data.carshop.employees;
//     res.json(employees);
// });

// router.get('/carmodels', (req, res) => {
//     const carmodels = data.carshop.carmodels;
//     res.json(carmodels);
// });

module.exports = router