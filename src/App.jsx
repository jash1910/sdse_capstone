import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './ui/components/Navbar';
import Home from './ui/pages/Home';
import Play from './ui/pages/Play';
import Tournament from './ui/pages/Tournament';
import Replay from './ui/pages/Replay';
import About from './ui/pages/About';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            {/* Navbar stays permanently at top */}
            <Navbar />

            {/* Route Switcher */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/play" element={<Play />} />
                    <Route path="/tournament" element={<Tournament />} />
                    <Route path="/replay" element={<Replay />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
