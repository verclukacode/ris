import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Search() {

    const [error, setError] = useState(null);  // State to track errors

    const [searchPompt, setSearchPompt] = useState('');
    const handleInputChange = (event) => {
        setSearchPompt(event.target.value); // Update state with input field's current value
    };

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const goHome = () => {
        navigate("../");
    }

    const search = async () => {
        try {
            const response = await fetch(`http://localhost:8080/search/${searchPompt}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();  // Parse JSON response
            setTasks(data);  // Set the tasks in state
        } catch (error) {
            setError(error.message);  // Set error message if something goes wrong
        }
    }

    const toggleTask = async (id, completed) => {

        try {
            const response = await fetch('http://localhost:8080/updateTaskStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    completed: completed
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const updatedTasks = await response.json();  // Parse the updated task list
            setTasks(updatedTasks);  // Update the tasks list in state
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="Search">
            <div className="centered-container">
                <div className="content-box">
                    <div style={{
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        <button style={{
                            backgroundColor: "transparent",
                            borderStyle: "none",
                            fontSize: "17px",
                            color: "#C8A2D6"
                        }} onClick={goHome}>Home
                        </button>
                        <h1 style={{
                            paddingLeft: "30px"
                        }}>Search</h1>
                    </div>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        <input
                            type="text"
                            value={searchPompt} // The value is controlled by React state
                            onChange={handleInputChange} // The event handler to track changes
                            style={{
                                height: '50px',
                                width: '90%',
                                boxSizing: 'border-box',
                                fontSize: '17px',
                                color: "white",
                                backgroundColor: "#151515",
                                padding: "15px",
                                borderRadius: "25px",
                                borderStyle: "solid",
                                borderColor: "#C8A2D6"
                            }}
                        />
                        <button style={{
                            width: "10%",
                            backgroundColor: "transparent",
                            borderStyle: "none",
                            fontSize: "17px",
                            color: "#C8A2D6"
                        }} onClick={search}>Search
                        </button>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "30px"
                    }}>
                        {tasks.map((task) => (
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                paddingBottom: "15px"
                            }} key={task.id}>
                                <button style={{
                                    backgroundColor: task.completed ? "#C8A2D6" : "transparent",  // Change color if task is completed
                                    borderColor: "#C8A2D6",
                                    borderWidth: 2,
                                    borderStyle: "solid",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "15px"
                                }}
                                        onClick={() => toggleTask(task.id, !task.completed)}  // Pass function reference
                                ></button>
                                <p style={{
                                    height: "30px",
                                    alignContent: "center",
                                    margin: 0,
                                    marginLeft: 15,
                                    color: "white",
                                    fontSize: "17px",
                                    fontWeight: "normal"
                                }}>{task.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;