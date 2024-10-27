import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home/Home.js';  // Import your HomePage component
import SearchPage from './search/Search.js';  // Import your SearchPage component

function App() {
    return (
        <Router>
            <div>
                {/* Define the routes */}
                <Routes>
                    {/* The homepage route */}
                    <Route path="/" element={<HomePage />} />

                    {/* The search page route */}
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;