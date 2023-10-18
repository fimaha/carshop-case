const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, getDoc, collection, query, where } = require('firebase/firestore');
const firebaseConfig = require("../firebaseConfig.json");

const express = require('express')
const router = express.Router()

initializeApp(firebaseConfig);
const db = getFirestore();

// Carmodels
router.get('/carmodels', async (req, res) => {
    try {
        const docRef = doc(db, 'data', 'one');
        const docSnapshot = await getDoc(docRef);
        const carshopData = docSnapshot.data();

        if (carshopData && carshopData.carshop && carshopData.carshop.carmodels) {
            const carmodels = carshopData.carshop.carmodels;
            res.json(carmodels);
        } else {
            res.status(404).send('Car models not found.');
        }
    } catch (error) {
        console.error('Error fetching car models:', error);
        res.status(500).send('Error fetching car models');
    }
});

// Check if account exists when logging in
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

// Add account info when creating an account
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

module.exports = router