import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function TopMovies() {
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    function fetchMovies() {
        axios.get('http://127.0.0.1:5000/topmovies')
            .then(response => {
                console.log(response.data);
                setMovies(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        fetchActors();
    }, []);

    function fetchActors() {
        axios.get('http://127.0.0.1:5000/topactors')
            .then(response => {
                console.log(response.data);
                setActors(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    function fetchFilms() {
        axios.get('http://127.0.0.1:5000/Films')
            .then(response => {
                console.log(response.data);
                setActors(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="container">
             <p><Link to="/topMovies" className="btn btn-success">Top Movies</Link><Link to="/" className="btn btn-success">Customer</Link><Link to="/films" className="btn btn-success">Films</Link></p>
            <h1>List of Top Movies</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr key={movie.film_id}>
                            <td>{movie.title}</td>
                            <td>
                                <Link to={`/moviedetails/${movie.film_id}`} className="btn btn-primary mr-2">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h1>List of Top Actors</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {actors.map(actor_info => (
                        <tr key={actor_info.actor_id}>
                            <td>{actor_info.first_name}</td>
                            <td>{actor_info.last_name}</td>
                            <td>
                                <Link to={`/actorinfo/${actor_info.actor_id}`} className="btn btn-primary mr-2">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
