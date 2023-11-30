import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../Firebase";
import { getFromFirebase, queryFromFirebase } from "../helpers/firebaseHelper";
import "./BooksContainer.css";

function BooksContainer() {
    const [user, loading, error] = useAuthState(auth);
    const [books, setBooks] = useState(null);
    const [buscar, setBuscar] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchBooks = async () => {
        try {
            const data = await getFromFirebase("Libros");
            setBooks(data);
            setBuscar("");
            setIsLoading(false);
            console.log(books);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const fetchBooksByTitulo = async () => {
        try {
            const data = await queryFromFirebase("Libros", {
                dataQuery: {
                    field: "titulo",
                    operator: "==",
                    value: buscar,
                },
            });
            setBooks(data);
            setIsLoading(false);
            console.log(books);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const fetchBooksByAutor = async () => {
        try {
            const data = await queryFromFirebase("Libros", {
                dataQuery: {
                    field: "autor",
                    operator: "==",
                    value: buscar,
                },
            });
            setBooks(data);
            setIsLoading(false);
            console.log(books);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [isLoading]);

    const noBooks = () => {
        return (
            <div className="noBooks">
                <h3>Atualmente no hay registros que concuerden con la consulta</h3>
                <button className="fetchAllBooks" onClick={() => {fetchBooks()}}> Mostrar todos los libros</button>
            </div>
        );
    };

    const renderBooks = () => {
        return (
            <>
                <div className="searchContainer">
                    <div className="searchBar">
                        <input
                            type="text"
                            placeholder="Buscar"
                            onChange={(e) => {
                                setBuscar(e.target.value);
                            }}
                        />
                    </div>
                    <div className="searchButtonsContainer">
                        <button
                            className="searchButton"
                            onClick={() => {
                                fetchBooksByTitulo();
                            }}
                        >
                            Buscar por Título
                        </button>
                        <button
                            className="searchButton"
                            onClick={() => {
                                fetchBooksByAutor();
                            }}
                        >
                            Buscar por Autor
                        </button>
                        <button
                            className="searchButton"
                            onClick={() => {
                                fetchBooks();
                            }}
                        >
                            Ver todo
                        </button>
                    </div>
                </div>

                <div className="booksContainer">
                    {books.map((book) => {
                        return (
                            <div className="book" id={book.id}>
                                <Link
                                    to={`/book/${book.id}`}
                                    className="bookLink"
                                >
                                    <div className="bookTitulo">
                                        <p>Título: {book.data.titulo}</p>
                                    </div>
                                    <div className="bookAutor">
                                        <p>Autor: {book.data.autor}</p>
                                    </div>
                                    <div className="bookGenero">
                                        <p>Género: {book.data.genero}</p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    };

    return <div>{books ? renderBooks() : noBooks()}</div>;
}

export default BooksContainer;