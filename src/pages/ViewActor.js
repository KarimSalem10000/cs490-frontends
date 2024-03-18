import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Topactors() {
    const [actor, setActor] = useState(null); // Initialize actor as null
    const { id } = useParams();

    useEffect(() => {
        getUser();
    }, [id]);

    function getUser() {
        axios.get(`http://127.0.0.1:5000/actorinfo/${id}`)
        .then(function (response) {
            setActor(response.data);
            console.log(response.data);
        })
        .catch(function (error) {
            console.error("Error fetching actor:", error);
        });
    }

    return (
        <div className="container">
            <h1>List of Top actors</h1>
            {actor && (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>actor ID</th>
                            <th>first name</th>
                            <th>last name</th>
                            <th>last update</th>
                            <th>top movies</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={actor.actor_id}>
                            <td>{actor.actor_id}</td>
                            <td>{actor.first_name}</td>
                            <td>{actor.last_name}</td>
                            <td>{actor.last_update}</td>
                            <td>
                                <ul>
                                    {actor.top_movies.map((movie, index) => (
                                        <li key={index}>{movie.title}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}