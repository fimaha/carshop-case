const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { doc, setDoc } = require("firebase/firestore");
const firebaseConfig = require("./firebaseConfig.json");
const data = require("./data.json");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const documentPath = "data/one";
setDoc(doc(db, documentPath), data)
    .then(() => {
        console.log("Data successfully added to Firestore.");
    })
    .catch((error) => {
        console.error("Error adding data to Firestore: ", error);
    });
