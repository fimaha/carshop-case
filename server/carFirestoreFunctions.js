const { initializeApp } = require("firebase/app");
const { getFirestore, doc, deleteDoc } = require('firebase/firestore');
const { addDoc, collection } = require('firebase/firestore');
const firebaseConfig = require("./firebaseConfig.json");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// async function addCarToFirestore(newCar) {
//     try {
//         const data = {
//             brand: newCar.brand,
//             model: newCar.model,
//             price: newCar.price,
//         };
//         const carshopData = doc(db, 'data', 'one');
//         const carmodelsCollection = collection(carshopData, 'carshop', 'carmodels');
//         const docRef = await addDoc(carmodelsCollection, newCar);
//         return { ...newCar, id: docRef.id };
//     } catch (error) {
//         console.error('Error adding a car to Firestore:', error);
//         throw error;
//     }
// }

async function removeCarFromFirestore(carId) {
    try {
        const carshopData = doc(db, 'data', 'one');
        const carmodelsCollection = collection(carshopData, 'carshop', 'carmodels');
        const carDocRef = doc(carmodelsCollection, carId);
        await deleteDoc(carDocRef);
        // TODO return deleted car
    } catch (error) {
        console.error('Error removing a car from Firestore:', error);
        throw error;
    }
}