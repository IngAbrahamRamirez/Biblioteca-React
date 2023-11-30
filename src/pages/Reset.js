import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { sendPasswordReset } from "../helpers/authHelper";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Reset.css";
import Header from "../components/Header";

function Reset() {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const reset = (email) => {
        if (!email) alert("Please enter email");
        sendPasswordReset(email);
        navigate("/");
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
    }, [user, loading]);

    return (
        <>
            <Header />
            <div className="reset">
                <div className="reset__container">
                    <input
                        type="text"
                        className="reset__textBox"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo"
                        />
                        <button className="reset__btn" onClick={() => reset(email)}>
                            Enviar correo de recuperación
                        </button>
                        <div>
                            No tienes una cuenta?{" "}
                            <Link to="/register">Registrate</Link> ahora.
                        </div>
                    </div>
                </div>
            </>
        );
    }
    export default Reset;
