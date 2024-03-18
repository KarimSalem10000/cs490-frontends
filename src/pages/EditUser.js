import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditUser() {
    const { id } = useParams();
    const [inputs, setInputs] = useState({
        address: "",
        address2: "",
        district: "",
        phone: "",
        postal_code: "",
        email: "",
        first_name: "",
        last_name: ""
    });

    useEffect(() => {
        getUser();
    }, [id]); // Include id in the dependency array

    function getUser() {
        axios.get(`http://127.0.0.1:5000/userdetails/${id}`)
        .then(function (response) {
            // Set initial input values
            setInputs(response.data || {});
        })
        .catch(function (error) {
            console.error("Error fetching user:", error);
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    }

    const handleAddressInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            address: {
                ...prevInputs,
                [name]: value
            }
        }));
    }
    
    const handleSubmit = (e) => {  
        e.preventDefault();
        axios.put(`http://127.0.0.1:5000/userupdate/${id}`, inputs)
        .then((response) => {
            console.log(response.data);
            // Optionally: Redirect user or display success message
        })
        .catch((error) => {
            console.log(error);
            // Optionally: Display error message to the user
        });
    }

    return (
        <div className="container h-100">
            <div className="row">
                <div className="col-12"></div>
                <div className='col-8'>
                    <h1>Edit Customer</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>First Name</label>
                            <input type="text" className="form-control" name="first_name" value={inputs.first_name} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name="last_name" value={inputs.last_name} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={inputs.email} onChange={handleInputChange}/>
                        </div>
                        <div className='mb-3'>
                            <label>Address</label>
                            <input type="text" className="form-control" name="address" value={inputs.address} onChange={handleAddressInputChange}/>
                        </div>
                        <div className='mb-3'>
                            <label>Address2</label>
                            <input type="text" className="form-control" name="address2" value={inputs.address2} onChange={handleAddressInputChange}/>
                        </div>
                        <div className='mb-3'>
                            <label>District</label>
                            <input type="text" className="form-control" name="district" value={inputs.district} onChange={handleAddressInputChange}/>
                        </div>
                        <div className='mb-3'>
                            <label>Phone</label>
                            <input type="text" className="form-control" name="phone" value={inputs.phone} onChange={handleAddressInputChange}/>
                        </div>
                        <div className='mb-3'>
                            <label>Postal Code</label>
                            <input type="text" className="form-control" name="postal_code" value={inputs.postal_code} onChange={handleAddressInputChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
