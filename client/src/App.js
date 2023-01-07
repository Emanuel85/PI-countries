import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import CountryDetail from './components/CountryDetail/CountryDetail';
import SearchName from './components/SearchName/SearchName';
import AddActivity from './components/AddActivity/AddActivity';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/country/:id' element={<CountryDetail />} />
        <Route exact path='/search/:name' element={<SearchName />} />
        <Route exact path='/create' element={<AddActivity />} />
      </Routes>
    </div>
  );
}

export default App;
