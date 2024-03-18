import React from 'react';
import './App.css';

import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';

import ListUserPages from './pages/ListUserPages';
import TopMovies from './pages/topMovies';
import AddNewUser from './pages/AddNewUser';
import ViewMovie from './pages/ViewMovie';
import ViewActor from './pages/ViewActor';
import UserDetails from './pages/UserDetails';
import EditUser from './pages/EditUser';
import Films from './pages/Films';
import ViewFilm from './pages/ViewFilm';
//import DeleteUser from './pages/DeleteUser';

function App() {
  return (
    <div className="vh-100 gradient-custom">
      <div className="container">
        <h1 className="text-center ">Welcome to React Router</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListUserPages />} />
            <Route path="/addnewuser" element={<AddNewUser />} />
            <Route path="/topmovies" element={<TopMovies />} />
            <Route path="/moviedetails/:id" element={<ViewMovie />} />
            <Route path="/actorinfo/:id" element={<ViewActor />} />
            <Route path="/user/:id/edit" element={<EditUser />} />
            <Route path="/userdetails/:id" element={<UserDetails />} />
            <Route path="/films" element={<Films />} />
            <Route path="/viewfilm/:id" element={<ViewFilm />} />
            {/* <Route path="/deleteuser/:id" element={<DeleteUser />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App;
