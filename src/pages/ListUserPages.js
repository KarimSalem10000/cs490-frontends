import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ListUserPages() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchQuery === '') {
            // If search query is empty, show all users
            setSearchResults(users);
        } else {
            // Filter users based on search query
            const filteredUsers = users.filter(user =>
                user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.customer_id.toString().includes(searchQuery)
            );
            setSearchResults(filteredUsers);
        }
    }, [searchQuery, users]);

    useEffect(() => {
        // Fetch all users initially
        getUser();
    }, []);

    function getUser() {
        axios.get('http://127.0.0.1:5000/listusers')
            .then(function (response) {
                console.log(response.data);
                setUsers(response.data);
                setSearchResults(response.data); // Set search results initially
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function handleDeleteUser(userId) {
        const isConfirmed = window.confirm('Are you sure you want to delete this user?');
        if (isConfirmed) {
            axios.delete(`http://127.0.0.1:5000/userdelete/${userId}`)
                .then(function (response) {
                    console.log(response.data);
                    getUser(); // Refresh user list after deletion
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
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
                        <h1>List Customers</h1>
                        <p><Link to="/addnewuser" className="btn btn-primary">Add New Customers</Link></p>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-md-12'>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by First Name, Last Name, or ID"
                                    className="form-control form-input"
                                />
                                <span className="input-group-btn"></span>
                            </div>
                        </div>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Date Added</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((user) => 
                                    <tr key={user.customer_id}>
                                        <td>{user.customer_id}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.last_update}</td>
                                        <td>
                                            <Link to={`/userdetails/${user.customer_id}`} className="btn btn-info">view</Link>
                                            <Link to={`user/${user.customer_id}/edit`} className="btn btn-secondary">Edit</Link>
                                            <button onClick={() => handleDeleteUser(user.customer_id)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}