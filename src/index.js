import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import ErrorPage from "./pages/NotFound";
import AddBook from "./pages/AddBook";
import Book from "./pages/Book";
import EditBook from "./pages/EditBook";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/LogIn",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/Register",
        element: <Register />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/ResertPassword",
        element: <Reset />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/addBook",
        element: <AddBook />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/book/:id",
        element: <Book />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/editBook/:id",
        element: <EditBook />,
        errorElement: <ErrorPage />,
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();