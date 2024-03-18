import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CustomerDetails() {
    const [customer, setCustomer] = useState(null); // Initialize customer as null
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const { id } = useParams();

    useEffect(() => {
        getCustomer();
        fetchMovies();
    }, [id]);

    function getCustomer() {
        axios.get(`http://127.0.0.1:5000/listuser/${id}`)
            .then(function (response) {
                setCustomer(response.data);
                console.log(response.data);
            })
            .catch(function (error) {
                console.error("Error fetching customer:", error);
            });
    }

    function fetchMovies() {
        axios.get('http://127.0.0.1:5000/listfilms')
            .then(function (response) {
                setMovies(response.data);
            })
            .catch(function (error) {
                console.error("Error fetching movies:", error);
            });
    }

    function handleRentMovie() {
        // Check if a movie is selected
        if (selectedMovie) {
            // Add the selected movie to the rented_dvds list
            const updatedCustomer = { ...customer };
            updatedCustomer.rented_dvds.push(selectedMovie);
            setCustomer(updatedCustomer);

            // Reset selected movie to empty string
            setSelectedMovie('');

            // Update the customer's rented movies on the server
            axios.put(`http://127.0.0.1:5000/updateuser/${id}`, updatedCustomer)
                .then(function (response) {
                    console.log("Movie rented successfully:", response.data);
                })
                .catch(function (error) {
                    console.error("Error renting movie:", error);
                });
        }
    }

    function handleRemoveMovie(movieToRemove) {
        // Filter out the selected movie from the rented_dvds list
        const updatedCustomer = { ...customer };
        updatedCustomer.rented_dvds = updatedCustomer.rented_dvds.filter(movie => movie !== movieToRemove);
        setCustomer(updatedCustomer);

        // Reset selected movie to empty string
        setSelectedMovie('');

        // Update the customer's rented movies on the server
        axios.put(`http://127.0.0.1:5000/updateuser/${id}`, updatedCustomer)
            .then(function (response) {
                console.log("Movie removed successfully:", response.data);
            })
            .catch(function (error) {
                console.error("Error removing movie:", error);
            });
    }

    return (
        <div className="container">
            <h1>Customer Details</h1>
            {customer && (
                <div>
                    <h2>{customer.first_name} {customer.last_name}</h2>
                    <p>Email: {customer.email}</p>
                    <p>Address: {customer.address}</p>
                    <p>City: {customer.city}</p>
                    <p>Postal Code: {customer.postal_code}</p>
                    <p>Phone: {customer.phone}</p>
                    <p>Last Update: {customer.last_update}</p>
                    <h3>Current Rentals</h3>
                    <ul>
                        {customer.rented_dvds && customer.rented_dvds.map((dvd, index) => (
                            <li key={index}>
                                {dvd}
                                <button onClick={() => handleRemoveMovie(dvd)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <h3>Rent a Movie</h3>
                        <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
                            <option value="">Select a movie</option>
                            {movies.map((movie, index) => (
                                <option key={index} value={movie.title}>{movie.title}</option>
                            ))}
                        </select>
                        <button onClick={handleRentMovie}>Rent Movie</button>
                    </div>
                </div>
            )}
        </div>
    );
}