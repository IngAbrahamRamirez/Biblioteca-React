import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../helpers/authHelper";
import { auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Navbar.css";

function NavBar() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="navMenu">
      <Link to={"/"} className="navLink">
        Inicio
      </Link>
      |
      <Link to={"/addBook"} className="navLink">
        Agregar Libro
      </Link>
      |
      <Link to={"/"} className="navLink" onClick={logout}>
        Salir
      </Link>
    </div>
  );
}

export default NavBar;