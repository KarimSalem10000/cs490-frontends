import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function FilmDetails() {
    const [Film, setFilm] = useState([]); // Initialize Film as null
    const { id } = useParams();

    useEffect(() => {
        getFilm();
    }, [id]);

    function getFilm() {
        axios.get(`http://127.0.0.1:5000/listfilm/${id}`)
        .then(function (response) {
            setFilm(response.data);
            console.log(response.data);
        })
        .catch(function (error) {
            console.error("Error fetching Film:", error);
        });
    }

    return (
        <div className="container">
            <h1>Film Details</h1>
            {Film && (
                <div>
                    <h2>{Film.title}</h2>
                    <p>Rating: {Film.rating}</p>
                    <p>Description: {Film.description}</p>
                    <p>Release Year: {Film.release_year}</p>
                    <p>Language ID: {Film.language_id}</p>
                    <p>Original Language: {Film.original_language_id}</p>
                    <p>Rental Duration: {Film.rental_duration}</p>
                    <p>Rental Rate: {Film.rental_rate}</p>
                    <p>Length: {Film.length}</p>
                    <p>Replacement Cost: {Film.replacement_cost}</p>
                    <p>Special Features: {Film.special_features}</p>
                    <p>Last Update: {Film.last_update}</p>
                </div>
            )}
        </div>
    );
}