import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { queryGetDocFromFirebase, deleteFromFirebase } from "../helpers/firebaseHelper";
import Header from "../components/Header";
import "./Book.css";

function Book() {
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [idBook] = useState(useParams().id);
    const [user, loading, errorAuth] = useAuthState(auth);
    const navigate = useNavigate();

    const fetchBook = async () => {
        try {
            const data = await queryGetDocFromFirebase("Libros", idBook);
            setBook(data);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const deleteBook = async () => {
        try {
            deleteFromFirebase("Libros", idBook);
            alert("Libro eliminado correctamente");
            navigate("/");
        }
        catch (err) {
            console.error(err);
            alert("An error occured while deleting book");
        }
    }

    useEffect(() => {
        fetchBook();
    }, [isLoading]);

    console.log('Libro: ', book);

    if (isLoading) {
        return <p>Cargando Libro...</p>;
    } else {
        return (
            <>
                <Header />
                <Navbar />
                <div className="bookSelected">
                    <div className="bookSelectedTitulo">
                        <p>Libro: {book[0].data.titulo}</p>
                    </div>
                    <div className="bookSelectedAutor">
                        <p>Autor: {book[0].data.autor}</p>
                    </div>
                    <div className="bookSelectedGenero">
                        <p>Género: {book[0].data.genero}</p>
                    </div>
                    <div className="bookSelectedFechaPublicacion">
                        <p>Fecha de Publicación: {book[0].data.fechaPublicacion}</p>
                    </div>
                    <div className="buttonsContainer">
                        <button className="buttonEdit" onClick={() => navigate(`/editBook/${idBook}`)} >Editar</button>
                        <button className="buttonDelete" onClick={() => deleteBook()}>Eliminar</button>
                    </div>
                </div>

            </>
        );
    }
}

export default Book;
