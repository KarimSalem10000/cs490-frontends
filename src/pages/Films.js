import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ListUserPages() {
    const [films, setFilms] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // Fetch all films initially
        getFilms();
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            // If search query is empty, show all films
            setSearchResults(films);
        } else {
            // Filter films based on search query
            const filteredFilms = films.filter(film =>
                (film.title && film.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (film.actors && film.actors.some(actor =>
                    ((actor.first_name && actor.first_name.toLowerCase()) + ' ' + (actor.last_name && actor.last_name.toLowerCase())).includes(searchQuery.toLowerCase())
                )) ||
                (film.name && film.name.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setSearchResults(filteredFilms);
        }
    }, [searchQuery, films]);

    function getFilms() {
        axios.get('http://127.0.0.1:5000/listfilmos')
            .then(function (response) {
                console.log(response.data);
                setFilms(response.data);
                setSearchResults(response.data); // Set search results initially
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-12">
                        <p>
                            <Link to="/topMovies" className="btn btn-success">Top Movies</Link>
                            <Link to="/" className="btn btn-success">Customer</Link>
                            <Link to="/films" className="btn btn-success">Films</Link>
                        </p>
                        <h1>List Films</h1>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-md-12'>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by Film Title, Actor's Name, or Category"
                                    className="form-control form-input"
                                />
                                <span className="input-group-btn"></span>
                            </div>
                        </div>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Release Year</th>
                                    <th>Name</th>
                                    <th>Length</th>
                                    <th>Rating</th>
                                    <th>Actors</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((film) =>
                                    <tr key={film.film_id}>
                                        <td>{film.film_id}</td>
                                        <td>{film.title}</td>
                                        <td>{film.description}</td>
                                        <td>{film.release_year}</td>
                                        <td>{film.name}</td>
                                        <td>{film.length}</td>
                                        <td>{film.rating}</td>
                                        <td>
                                            {film.actors && film.actors.map((actor, index) => (
                                                <span key={index}>
                                                    {actor.first_name} {actor.last_name}
                                                    {index !== film.actors.length - 1 && ", "}
                                                </span>
                                            ))}
                                        </td>
                                        <td>
                                            <Link to={`/viewfilm/${film.film_id}`} className="btn btn-primary">Details</Link>
                                            <Link to={`/editfilm/${film.film_id}`} className="btn btn-secondary">Edit</Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <p><Link to="/addnewfilm" className="btn btn-success">Add New Film</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}