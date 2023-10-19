const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, getDoc, getDocs, deleteDoc, collection } = require('firebase/firestore');
const firebaseConfig = require("../firebaseConfig.json");

const express = require('express')
const router = express.Router()

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Carmodels
router.get('/carmodels', async (req, res) => {
    try {
        const carmodelsCollection = collection(db, 'carmodels'); // Update the path according to how you've added car models
        const carmodelsQuerySnapshot = await getDocs(carmodelsCollection);

        const carmodels = [];
        carmodelsQuerySnapshot.forEach((doc) => {
            carmodels.push({ id: doc.id, ...doc.data() });
        });

        if (carmodels.length > 0) {
            res.json(carmodels);
        } else {
            res.status(404).send('Car models not found.');
        }
    } catch (error) {
        console.error('Error fetching car models:', error);
        res.status(500).send('Error fetching car models');
    }
});

// Route to add a new car to Firestore
router.post('/carmodels', async (req, res) => {
    const { brand, model, price, id } = req.body;
    const newCarData = {
        brand: brand,
        model: model,
        price: price,
        id: id,
    };
    try {
        const carmodelsCollection = collection(db, 'carmodels')
        const newCarModelRef = doc(carmodelsCollection);
        await setDoc(newCarModelRef, newCarData);
        // await setDoc(doc(db, 'carmodels', email), data);
        res.status(201).json(newCarData); // Return the added car with its unique ID
    } catch (error) {
        res.status(500).send('Error adding a car to Firestore');
    }
});

// Route to remove a car from Firestore
router.delete('/carmodels/:carId', async (req, res) => {
    const carId = req.params.carId; // Access the carId from the URL parameter

    try {
        const carmodelsCollection = collection(db, 'carmodels');
        const carmodelsQuerySnapshot = await getDocs(carmodelsCollection);
        let foundCarId = null;
        carmodelsQuerySnapshot.forEach((doc) => {
            const carmodel = doc.data();
            if (carmodel.id === carId) {
                foundCarId = doc.id
            }
        });

        if (foundCarId) {
            // Remove the car document from Firestore
            const carDocRef = doc(carmodelsCollection, foundCarId);
            await deleteDoc(carDocRef);
            res.status(204).send('Car deleted successfully');
        } else {
            res.status(404).send('Car not found');
        }
    } catch (error) {
        console.error('Error removing a car from Firestore:', error);
        res.status(500).send('Error removing a car from Firestore');
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
        res.status(200).json('Successfully created account.');
        // res.send('Successfully created account.');
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).send('Error creating account');
    }

});

// Route to fetch user information based on email
router.get('/user-info', async (req, res) => {
    const { email } = req.query;

    try {
        const docRef = doc(db, 'accounts', email);
        const docSnapshot = await getDoc(docRef);
        const userData = docSnapshot.data();

        if (!userData) {
            res.status(404).send('User not found.');
            return;
        }

        const userInfo = {
            name: userData.name,
            surname: userData.surname,
            email: email,
        };

        res.status(200).json(userInfo);
    } catch (error) {
        console.error('Error fetching user information:', error);
        res.status(500).send('Error fetching user information.');
    }
});

// Route to fetch employee information based on full name
router.get('/employee-info', async (req, res) => {
    const { fullName } = req.query;

    try {
        const employeeData = {
            id: null,
            totalSalesAmount: 0,
            carsSold: [],
        };

        // Fetch the employee based on the full name
        const employeesCollection = collection(db, 'employees');
        const employeesQuerySnapshot = await getDocs(employeesCollection);
        employeesQuerySnapshot.forEach((doc) => {
            const employee = doc.data();
            if (employee.name === fullName) {
                employeeData.id = employee.id;
            }
        });

        if (employeeData.id !== null) {
            // If the employee exists, fetch related sales data
            const salesCollection = collection(db, 'sales');
            const salesQuerySnapshot = await getDocs(salesCollection);
            for (const doc of salesQuerySnapshot.docs) {
                const sale = doc.data();
                if (sale.employee_id === employeeData.id) {
                    const carmodelId = sale.carmodel_id
                    const carmodelsCollection = collection(db, 'carmodels');
                    const carmodelsQuerySnapshot = await getDocs(carmodelsCollection);
                    for (const doc of carmodelsQuerySnapshot.docs) {
                        const carmodel = doc.data();
                        if (carmodel.id == carmodelId) {
                            const carInfo = `${carmodel.brand} ${carmodel.model} ${carmodel.price}`;
                            employeeData.carsSold.push(carInfo);
                            employeeData.totalSalesAmount += carmodel.price;
                        }
                    }
                }
            }

            res.status(200).json(employeeData);
        } else {
            res.status(404).send('Employee not found.');
        }
    } catch (error) {
        console.error('Error fetching employee information:', error);
        res.status(500).send('Error fetching employee information.');
    }
});

module.exports = router