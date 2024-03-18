import React, { useState } from 'react';
import axios from 'axios';

export default function AddNewUser() {
    const [userData, setUserData] = useState({});

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/useradd', userData)
            .then(function (response) {
                console.log(response.data);
                // Handle success response
            })
            .catch(function (error) {
                console.log(error);
                // Handle error response
            });
    }

    return (
        <div>
            <div className="container h-100">
                <div className="row">
                    <div className="col-12"></div>
                    <div className='col-8'>
                        <h1>Add New Customers</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>First Name</label>
                                <input type="text" className="form-control" name="first_name" onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label>Last Name</label>
                                <input type="text" className="form-control" name="last_name" onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label>Email</label>
                                <input type="text" className="form-control" name="email" onChange={handleInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label>Address</label>
                                <input type="text" className="form-control" name="address" onChange={handleInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label>Address2</label>
                                <input type="text" className="form-control" name="address2" onChange={handleInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label>District</label>
                                <input type="text" className="form-control" name="district" onChange={handleInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label>City</label>
                                <input type="text" className="form-control" name="city" onChange={handleInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label>Postal Code</label>
                                <input type="text" className="form-control" name="postal_code" onChange={handleInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label>Phone</label>
                                <input type="text" className="form-control" name="phone" onChange={handleInputChange} />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    )
}