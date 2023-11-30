import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { registerWithEmail, signInWithGoogle } from "../helpers/authHelper";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Register.css";
import Header from "../components/Header";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmail(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <>
      <Header />
      <div className="register">
        <div className="register__container">
          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre completo"
          />
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
          />
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button className="register__btn" onClick={register}>
            Registrarse
          </button>
          <button
            className="register__btn register__google"
            onClick={signInWithGoogle}
          >
          Registrarse con Google
          </button>
          <div>
            Ya tienes una cuenta? <Link to="/">Ingresa</Link> ahora.
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;