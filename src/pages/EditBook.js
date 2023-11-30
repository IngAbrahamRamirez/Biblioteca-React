import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { updateFromFirebase, queryGetDocFromFirebase } from "../helpers/firebaseHelper";
import Header from "../components/Header";
import Navbar from "../components/NavBar";
import "./EditBook.css";

function EditBook() {
    const [user, loading, error] = useAuthState(auth);
    const [isLoading, setIsLoading] = useState(true);
    const [idBook] = useState(useParams().id);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const navigate = useNavigate();

    const fetchBook = async () => {
        try {
            const data = await queryGetDocFromFirebase("Libros", idBook);
            setTitle(data[0].data.titulo);
            setAuthor(data[0].data.autor);
            setGenre(data[0].data.genero);
            setPublicationDate(data[0].data.fechaPublicacion);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const book = {
            title,
            author,
            genre,
            publicationDate,
        };

        updateFromFirebase(
            {
                objectToSave: {
                    uid: user.uid,
                    titulo: book.title,
                    autor: book.author,
                    genero: book.genre,
                    fechaPublicacion: book.publicationDate,
                },
            },
            "Libros",
            idBook
        );
        alert("Editado Correctamente");

        navigate("/");
    };

    useEffect(() => {
        fetchBook();
    }, [isLoading]);


    return (
        <>
            <Header />
            <Navbar />
            <div className="editBook">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Título"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <input
                        type="text"
                        placeholder="Autor"
                        onChange={(e) => setAuthor(e.target.value)}
                        value={author}
                    />
                    <input
                        type="text"
                        placeholder="Género"
                        onChange={(e) => setGenre(e.target.value)}
                        value={genre}
                    />
                    <input
                        type="date"
                        placeholder="Fecha de publicación"
                        onChange={(e) => setPublicationDate(e.target.value)}
                        value={publicationDate}
                    />
                    <button type="submit">Actualizar libro</button>
                </form>
            </div>
        </>
    );
}

export default EditBook;
