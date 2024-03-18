import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function TopMovies() {
    const [movie, setMovie] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getUser();
    }, [id]); // Include id in the dependency array

    function getUser() {
        axios.get(`http://127.0.0.1:5000/movieinfo/${id}`) // Corrected endpoint
        .then(function (response) {
            setMovie(response.data); // Set fetched user data
            console.log(response.data);
        })
        .catch(function (error) {
            console.error("Error fetching user:", error);
        });
    }




    return (
        <div className="container">
            <h1>List of Top Movies</h1>
            <table className="table table-bordered">
            <thead>
            <tr>
                <th>Movie ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Rental Count</th>
                <th>Description</th>
                <th>Release Year</th>
                <th>Language ID</th>
                <th>Rental Duration</th>
                <th>Rental Rate</th>
                <th>Length</th>
                <th>Replacement Cost</th>
                <th>Rating</th>
                <th>Special Features</th>
            </tr>
        </thead>
        <tbody>
        <tr key={movie.film_id}>
                <td>{movie.film_id}</td>
                <td>{movie.title}</td>
                <td>{ movie.category}</td>
                <td>{ movie.rental_count}</td>
                <td>{ movie.description}</td>
                <td>{ movie.release_year}</td>
                <td>{ movie.language_id}</td>
                <td>{ movie.rental_duration}</td>
                <td>{ movie.rental_rate}</td>
                <td>{ movie.length}</td>
                <td>{ movie.replacement_cost}</td>
                <td>{ movie.rating}</td>
                <td>{ movie.special_features}</td>
            </tr>
        </tbody>
            </table>            
        </div>
    );
}