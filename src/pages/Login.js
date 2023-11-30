import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { signInWithEmail, signInWithGoogle } from "../helpers/authHelper";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmail(email, password)}
        >
          Ingresar
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Acceder con Google
        </button>
        <div>
          <Link to="/ResertPassword">Olvidé mi constraseña</Link>
        </div>
        <div>
          No tienes una cuenta? <Link to="/register">Registrate</Link> ahora.
        </div>
      </div>
    </div>
  );
}
export default Login;