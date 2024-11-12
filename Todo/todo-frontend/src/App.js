import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './home/Home.js';  // Import your HomePage component
import SearchPage from './search/Search.js';
import TaskPage from "./task/Task.js";  // Import your SearchPage component

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/edit/:taskID" element={<TaskPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;