import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../Firebase";
import { addToFirebase, queryFromFirebase } from "./firebaseHelper";

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      console.log(user);
  
      const docs = await queryFromFirebase("Usuarios", {
        dataQuery: {
          field: "uid",
          operator: "==",
          value: user.uid,
        },
      });
  
      if (docs === null || docs.length === 0) {
        await addToFirebase({
          objectToSave: {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
          },
        },
        "Usuarios"
      )};
      console.log("Persona creada");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

const signInWithEmail = async (email, password) => {
    try {
        console.log(email, password);
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmail = async (name, email, password) => {
    try {
        console.log(email, password, name);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addToFirebase(
            {
                objectToSave: {
                    uid: user.uid,
                    name: name,
                    authProvider: "local",
                    email: email,
                },
            },
            "Usuarios"
        );
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Correo enviado!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export {
    signInWithGoogle,
    signInWithEmail,
    registerWithEmail,
    sendPasswordReset,
    logout,
};
