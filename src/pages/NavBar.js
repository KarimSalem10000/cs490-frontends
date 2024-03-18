import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Sakila</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/listusers" className="nav-link">List Customers</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/topmovies" className="nav-link">Top Movies</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}