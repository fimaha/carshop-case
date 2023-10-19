const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, getDoc, getDocs, deleteDoc, collection } = require('firebase/firestore');
const firebaseConfig = require("../firebaseConfig.json");

const express = require('express')
const router = express.Router()

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get carmodels
router.get('/carmodels', async (req, res) => {
    try {
        const carmodelsCollection = collection(db, 'carmodels');
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

// Add a new car to Firestore
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
        res.status(201).json(newCarData);
    } catch (error) {
        res.status(500).send('Error adding a car to Firestore');
    }
});

// Remove a car
router.delete('/carmodels/:carId', async (req, res) => {
    const carId = req.params.carId;

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

// Read if account exists when logging in
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

// Create a new account
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
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).send('Error creating account');
    }

});

// Read user information based on email
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

// Fetch employee data
router.get('/employees', async (req, res) => {
    try {
        const employeesData = {};

        const employeesCollection = collection(db, 'employees');
        const employeesQuerySnapshot = await getDocs(employeesCollection);

        for (const doc of employeesQuerySnapshot.docs) {
            const employeeData = {
                id: null,
                name: "",
                totalSalesAmount: 0,
                carsSold: [],
            };

            const employee = doc.data();
            const salesCollection = collection(db, 'sales');
            const salesQuerySnapshot = await getDocs(salesCollection);

            for (const doc of salesQuerySnapshot.docs) {
                const sale = doc.data();
                if (sale.employee_id === employee.id) {
                    const carmodelId = sale.carmodel_id;
                    const carmodelsCollection = collection(db, 'carmodels');
                    const carmodelsQuerySnapshot = await getDocs(carmodelsCollection);

                    for (const doc of carmodelsQuerySnapshot.docs) {
                        const carmodel = doc.data();
                        if (carmodel.id === carmodelId) {
                            const carInfo = {
                                brand: carmodel.brand,
                                model: carmodel.model,
                                price: carmodel.price,
                            };
                            employeeData.id = employee.id
                            employeeData.name = employee.name
                            employeeData.carsSold.push(carInfo);
                            employeeData.totalSalesAmount += carmodel.price;
                        }
                    }
                }
            }

            employeesData[employee.id] = employeeData;
        }

        res.status(200).json(employeesData);
    } catch (error) {
        console.error('Error fetching employees information:', error);
        res.status(500).send('Error fetching employees information.');
    }
});


// Update car model
router.put('/carmodels/:carId', async (req, res) => {
    const carId = req.params.carId;
    const { brand, model, price } = req.body;

    try {
        const carmodelsCollection = collection(db, 'carmodels');
        const carDocRef = doc(carmodelsCollection, carId);

        const carDocSnapshot = await getDoc(carDocRef);
        if (!carDocSnapshot.exists()) {
            return res.status(404).send('Car not found');
        }

        await setDoc(carDocRef, {
            brand: brand,
            model: model,
            price: price,
        });

        const updatedCarData = {
            id: carId,
            brand: brand,
            model: model,
            price: price,
        };

        res.status(200).json(updatedCarData);
    } catch (error) {
        console.error('Error updating a car in Firestore:', error);
        res.status(500).send('Error updating a car in Firestore');
    }
});

module.exports = router