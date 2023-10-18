const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { doc, setDoc } = require("firebase/firestore");
const firebaseConfig = require("./firebaseConfig.json"); // Replace with the path to your Firebase configuration file
const data = require("./data.json"); // Replace with the path to your data file

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Specify the path to the document and set the data
const documentPath = "data/one"; // Adjust this path according to your Firestore structure
setDoc(doc(db, documentPath), data)
    .then(() => {
        console.log("Data successfully added to Firestore.");
    })
    .catch((error) => {
        console.error("Error adding data to Firestore: ", error);
    });
