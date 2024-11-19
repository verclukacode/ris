import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';

function Task() {
    const { taskID } = useParams();
    const [task, setTask] = useState({});
    const navigate = useNavigate();

    const goHome = () => {
        navigate("../");
    };

    const updateTask = async (id, completed, title, description, importance) => {
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
                    completed: completed
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const updatedTasks = await response.json();
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteTask = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const response = await fetch(`http://localhost:8080/deleteTask/${task.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                goHome();
            } catch (error) {
                console.error(error.message);
            }
        }
    };

    const saveTask = async () => {
        saveTask()
        goHome()
    };

    const loadTask = async () => {
        try {
            const response = await fetch(`http://localhost:8080/getTask/${taskID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTask(data[0]);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        loadTask();
    }, []);

    const inputStyle = {
        height: '50px',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: '17px',
        color: "white",
        backgroundColor: "#151515",
        padding: "15px",
        borderRadius: "25px",
        borderStyle: "solid",
        borderColor: "#C8A2D6",
        marginBottom: "30px"
    };

    return (
        <div className="Task">
            <div className="centered-container">
                <div className="content-box">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <button
                            style={{
                                backgroundColor: "transparent",
                                borderStyle: "none",
                                fontSize: "17px",
                                color: "#C8A2D6"
                            }}
                            onClick={goHome}
                        >
                            Home
                        </button>
                        <h1 style={{ paddingLeft: "30px" }}>Edit Task</h1>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                        <h3 style={{ color: "white" }}>Title</h3>
                        <input style={inputStyle} type="text" value={task.title || ''} />

                        <h3 style={{ color: "white" }}>Description</h3>
                        <input style={inputStyle} type="text" value={task.description || ''} />

                        <h3 style={{ color: "white" }}>Importance</h3>
                        <input style={inputStyle} type="text" value={task.importance || ''} />

                        <div>
                            <button
                                style={{
                                    backgroundColor: "transparent",
                                    borderStyle: "none",
                                    fontSize: "17px",
                                    color: "#ffffff"
                                }}
                                onClick={saveTask}
                            >
                                Save
                            </button>
                            <button
                                style={{
                                    backgroundColor: "transparent",
                                    borderStyle: "none",
                                    fontSize: "17px",
                                    color: "#ff2a60"
                                }}
                                onClick={deleteTask}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Task;