import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Add from './Components/Add';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import Home from './Components/Home';
import AddUsers from './Components/AddUsers';

function App() {
  return (
    <div className="App">
         

          <BrowserRouter>
             <Navbar/>
            <Routes>
              <Route path='/' element= {<Home />} /> 
              <Route path='/add' element= {<Add />} /> 
              <Route path='/addUser' element= {<AddUsers />} /> 
              
           
            </Routes>
          
          </BrowserRouter>

    </div>
  );
}

export default App;
