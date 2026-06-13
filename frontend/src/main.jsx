import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LinkGenerated from './pages/LinkGenerated';
import Card from './pages/Card';
import PickDate from './pages/PickDate';
import FoodVibe from './pages/FoodVibe';
import Yay from './pages/Yay';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/link-generated" element={<LinkGenerated />} />
        <Route path="/card/:id" element={<Card />} />
        <Route path="/pick-date/:id" element={<PickDate />} />
        <Route path="/food-vibe/:id" element={<FoodVibe />} />
        <Route path="/yay/:id" element={<Yay />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
