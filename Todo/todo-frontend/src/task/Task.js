import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';

function Task() {
    const { taskID } = useParams();

    const navigate = useNavigate();

    const goHome = () => {
        navigate("../");
    }

    return (
        <div className="Task">
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
                        }}>Edit Task</h1>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <h1>{taskID}</h1>
                        <p>Edit title</p>
                        <p>Edit description</p>
                        <p>Edit importance - dropdown</p>
                        <p>Delete task</p>
                        <p>Save task</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Task;