import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import { queryFromFirebase } from "./helpers/firebaseHelper";
import Navbar from "./components/NavBar";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BooksContainer from "./components/BooksContainer";
import "./App.css";

function App() {
    const [user, loading, error] = useAuthState(auth);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const fetchUserName = async () => {
        try {
            const data = await queryFromFirebase("Usuarios", {
                dataQuery: {
                    field: "uid",
                    operator: "==",
                    value: user.uid,
                },
            });
            console.log(data);
            setIsLoading(false);
            setName(data[0].name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (user) fetchUserName();
    }, [user, isLoading]);

    const toggleLoginRegister = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="App">
            {user ? (
                <>
                    <Header />
                    <Navbar />
                    <BooksContainer />
                </>
            ) : (
                <>
                    <Header />
                    {isLogin ? <Login /> : <Register />}
                    <button onClick={toggleLoginRegister}>
                        {isLogin ? "Register" : "Login"}
                    </button>
                </>
            )}
        </div>
    );
}

export default App;
