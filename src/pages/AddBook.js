import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { addToFirebase } from "../helpers/firebaseHelper";
import Header from "../components/Header";
import Navbar from "../components/NavBar";
import "./AddBook.css";

function AddBook() {
    const [user, loading, error] = useAuthState(auth);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const book = {
            title,
            author,
            genre,
            publicationDate,
        };

        addToFirebase(
            {
                objectToSave: {
                    uid: user.uid,
                    titulo: book.title,
                    autor: book.author,
                    genero: book.genre,
                    fechaPublicacion: book.publicationDate,
                },
            },
            "Libros"
        );
        alert("Agregado a la biblioteca, gracias por tu contribución");

        navigate("/");
    };

    return (
        <>
            <Header />
            <Navbar />
            <div className="addBook">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Título"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Autor"
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Género"
                        onChange={(e) => setGenre(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="Fecha de publicación"
                        onChange={(e) => setPublicationDate(e.target.value)}
                    />
                    <button type="submit">Agregar libro</button>
                </form>
            </div>
        </>
    );
}

export default AddBook;
