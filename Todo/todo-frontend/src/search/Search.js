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

    const [byTitleTasks, setByTitleTasks] = useState([]);
    const [byCategortyTasks, setByCategortyTasks] = useState([]);
    const [byImportanceTasks, setByImportanceTasks] = useState([]);

    const goHome = () => {
        navigate("../");
    }

    const [searchResultPompt, setSearchResultPompt] = useState('');

    const search = async () => {
        setSearchResultPompt(searchPompt)
        try {
            const response = await fetch(`http://localhost:8080/search/${searchPompt}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();  // Parse JSON response
            setByTitleTasks(data.title);
            setByCategortyTasks(data.description);
            setByImportanceTasks(data.importance);
        } catch (error) {
            setError(error.message);  // Set error message if something goes wrong
        }
    }

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
                        <h3>Title containing "{searchResultPompt}"</h3>
                        {byTitleTasks.map((task) => (
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
                        <h3>Category containing "{searchResultPompt}"</h3>
                        {byCategortyTasks.map((task) => (
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
                        <h3>Importance containing "{searchResultPompt}"</h3>
                        {byImportanceTasks.map((task) => (
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