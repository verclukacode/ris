import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);  // State to store all tasks
    const [newTaskText, setNewTaskText] = useState('');  // State to store new task text

    const handleInputChange = (event) => {
        setNewTaskText(event.target.value); // Update state with input field's current value
    };


    const openSearch = () => {
        navigate("/search");
    }

    // Fetch tasks from the backend when the component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://localhost:8080/tasks", {
                    method: "GET",
                    credentials: "include", // Include session cookies
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }

                const data = await response.json();
                setTasks(data); // Update state with tasks
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchTasks();
    }, []);

    const syncThings = async () => {
        try {
            // Call the backend API to sync tasks
            const response = await fetch("http://localhost:8080/syncTask", {
                method: "POST",
                credentials: "include", // Include cookies/session for OAuth
            });

            // Handle response
            const result = await response.text(); // Backend returns a plain string
            console.log(result)
        } catch (error) {
            console.error("Error syncing tasks:", error);
        }
    }

    // Function to handle adding a new task
    const addTask = async () => {
        if (newTaskText.trim() === '') {
            return;  // Don't add an empty task
        }

        try {
            const response = await fetch('http://localhost:8080/newTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTaskText })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const updatedTasks = await response.json();  // Parse the updated task list
            setTasks(updatedTasks);  // Update the tasks list in state
            setNewTaskText('');  // Clear the input field after adding the task
        } catch (error) {
            console.log(error.message)
        }
    };

    const updateTask = async (id, completed, title, description, importance, imageString) => {

        try {
            const response = await fetch('http://localhost:8080/updateTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    title: title,
                    description: description,
                    importance: importance,
                    completed: completed,
                    imageBase64: imageString
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const updatedTasks = await response.json();  // Parse the updated task list
            setTasks(updatedTasks);  // Update the tasks list in state
        } catch (error) {
            console.log(error.message)
        }
    };

    const handleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    const deleteCheckedTasks = async () => {

        if (window.confirm('Are you sure you want to delete all completed tasks?')) {
            try {
                const response = await fetch('http://localhost:8080/deleteChecked');
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();  // Parse JSON response
                setTasks(data);  // Set the tasks in state
            } catch (error) {
                console.log(error.message)
            }
        }
    };

    return (
        <div className="Home">
            <div className="centered-container">
                <div className="content-box">
                    <div style={{
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        <h1>Home</h1>
                        <button style={{
                            backgroundColor: "transparent",
                            borderStyle: "none",
                            fontSize: "17px",
                            color: "#C8A2D6",
                            paddingLeft: "30px"
                        }} onClick={openSearch}>Search
                        </button>
                        <button style={{
                            backgroundColor: "transparent",
                            borderStyle: "none",
                            fontSize: "17px",
                            color: "#C8A2D6",
                            paddingLeft: "30px"
                        }} onClick={handleLogin}>Login Google</button>
                        <button style={{
                            backgroundColor: "transparent",
                            borderStyle: "none",
                            fontSize: "17px",
                            color: "#C8A2D6",
                            paddingLeft: "30px"
                        }} onClick={syncThings}>Sync Google</button>
                    </div>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        <input
                            type="text"
                            value={newTaskText} // The value is controlled by React state
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
                        }}

                                onClick={addTask}>Add</button>
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
                                        onClick={() => updateTask(task.id, !task.completed, task.title, task.description, task.importance, task.imageBase64)}  // Pass function reference
                                ></button>
                                <a style={{textDecoration: "none"}} href={"http://localhost:3000/edit/" + task.id}>
                                    <p style={{
                                        height: "30px",
                                        alignContent: "center",
                                        margin: 0,
                                        marginLeft: 15,
                                        color: "white",
                                        fontSize: "17px",
                                        fontWeight: "normal"
                                    }}>{task.title}</p>
                                </a>
                            </div>
                        ))}
                        <button style={{
                            height: '50px',
                            width: "200px",
                            boxSizing: 'border-box',
                            fontSize: '17px',
                            color: "white",
                            backgroundColor: "#FD7484",
                            borderRadius: "25px",
                            borderColor: "transparent",
                            marginTop: "30px"

                        }} onClick={deleteCheckedTasks}>Remove checked items</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;