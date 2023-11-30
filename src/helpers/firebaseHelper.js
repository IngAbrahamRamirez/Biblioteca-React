import {
    collection,
    doc,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
} from "firebase/firestore";
import { db } from "../Firebase";

const addToFirebase = async ({ objectToSave }, collectionName) => {
    try {
        const docRef = await addDoc(
            collection(db, collectionName),
            objectToSave
        );
        console.log(
            "Document written to table " + collectionName + " with ID: ",
            docRef.id
        );
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
};

const getFromFirebase = async (collectionName) => {
    let data = [];
    const querySnapshot = await getDocs(collection(db, collectionName));
    console.log("Data Recuperada", querySnapshot);
    querySnapshot.forEach((doc) => {
        data.push({
            id: doc.id,
            data: doc.data(),
        });
    });
    return data;
};

const queryFromFirebase = async (collectionName, { dataQuery }) => {
    let data = [];
    const querySnapshot = await getDocs(
        query(
            collection(db, collectionName),
            where(dataQuery.field, dataQuery.operator, dataQuery.value)
        )
    );
    if (querySnapshot.empty) {
        console.log("No matching documents.");
        return null;
    }
    console.log("Data Recuperada");
    querySnapshot.forEach((doc) => {
        data.push({
            id: doc.id,
            data: doc.data(),
        });
    });
    return data;
};

const queryGetDocFromFirebase = async (collectionName, docId) => {
    let data = [];
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        data.push({
            id: docSnap.id,
            data: docSnap.data(),
        });
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    return data;
}

const updateFromFirebase = async (
    { objectToSave },
    collectionName,
    idElement
) => {
    try {
        const docRef = await updateDoc(
            doc(db, collectionName, idElement),
            objectToSave
        );
        console.log(
            "Document written to table " + collectionName + " with ID: ",
            docRef.id
        );
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
};

const deleteFromFirebase = async (collectionName, idElement) => {
    try {
        const docRef = await deleteDoc(doc(db, collectionName, idElement));
        console.log(
            "Document written to table " + collectionName + " with ID: ",
            docRef.id
        );
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
};

export {
    addToFirebase,
    getFromFirebase,
    queryFromFirebase,
    queryGetDocFromFirebase,
    updateFromFirebase,
    deleteFromFirebase,
};
