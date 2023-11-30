import React, { useState, useEffect } from "react";
import { auth } from "../Firebase";
import { queryFromFirebase } from "../helpers/firebaseHelper";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Header.css";

function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  const fetchUserName = async () => {
    try {
      const r = await queryFromFirebase("Usuarios", {
        dataQuery: {
          field: "uid",
          operator: "==",
          value: user.uid,
        },
      });
      if (r.length > 0) {
        setName(r[0].data.name);
      } else if (r.length === 0) {
        console.log("No se encontró el usuario");
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) fetchUserName();
  }, [user, loading]);

  return (
    <div className="App-header">
      <h1>Biblioteca Virtual</h1>
      <h2>{user ? name : ""} </h2>
    </div>
  );
}
export default Header;