import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';

function Task() {
    const { taskID } = useParams();
    const [task, setTask] = useState({});
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [importance, setImportance] = useState("");

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
        updateTask(taskID, task.completed, title, description, importance);
        window.open("http://localhost:3000", '_self');
    };

    const loadTask = async () => {
        try {
            const response = await fetch(`http://localhost:8080/getTask/${taskID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTitle(data[0].title);
            setDescription(data[0].description);
            setImportance(data[0].importance);
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

    const selectStyle = {
        ...inputStyle,
        padding: '10px'
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
                            Cancel
                        </button>
                        <h1 style={{ paddingLeft: "30px" }}>Edit Task</h1>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                        <h3 style={{ color: "white" }}>Title</h3>
                        <input style={inputStyle} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                        <h3 style={{ color: "white" }}>Category</h3>
                        <input style={inputStyle} type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

                        <h3 style={{ color: "white" }}>Importance</h3>
                        <select style={selectStyle} value={importance} onChange={(e) => setImportance(e.target.value)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

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