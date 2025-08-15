import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import NotesContext from '../context/NotesContext';
import axios from 'axios';


function Home() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const { notes, setNotes, fetchNotes } = useContext(NotesContext);
    console.log(notes);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!!localStorage.getItem("authToken")) {
                const res = await axios.post("http://localhost:5000/api/notes/newNotes", {
                    title,
                    description,
                    tag
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': localStorage.getItem("authToken")
                    }
                });
                if (res.status === 201) {
                    alert("Note added successfully!");
                    window.location.reload();
                } else {
                    alert("Failed to add note: " + res.data.message);
                }
            } else {
                alert("Please login to add notes");
                return;
            }
        } catch (error) {
            if (error.response) {
                alert(`Login failed: ${error.response.data.message}`);
            } else {
                alert("Network error. Please try again.");
            }
            console.error("Error during login:", error);
        }
    }

    const handleReset = () => {
        setTitle("");
        setDescription("");
        setTag("");
    }

    const handleDelete = async (id) => {
        try {
            if (!!localStorage.getItem("authToken")) {
                const res = await axios.delete(`http://localhost:5000/api/notes/deleteNote/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': localStorage.getItem("authToken")
                    }
                });
                if (res.status === 200) {
                    alert("Note deleted successfully!");
                    fetchNotes(); // Refresh notes after deletion
                } else {
                    alert("Failed to delete note: " + res.data.message);
                }
            } else {
                alert("Please login to delete notes");
                return;
            }
        } catch (error) {
            if (error.response) {
                alert(`Delete failed: ${error.response.data.message}`);
            } else {
                alert("Network error. Please try again.");
            }
            console.error("Error during delete:", error);
        }
    }

    return (
        <>
            <h1 className="container my-3 ">Welcome to iNoteBook</h1>
            <p className="container">Here you can add your notes and manage them easily.</p>
            <hr className="my-4 mx-5 hv-100" />
            <h2 className="container text-center">Add a Note</h2>
            <p className="container text-center">Add your notes below:</p>
            <form className="container my-3" onSubmit={handleSubmit} onReset={handleReset}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label"><strong>Title</strong></label>
                    <input type="text" className="form-control" id="title" aria-describedby="title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label for="Description" className="form-label"><strong>Description</strong></label>
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }} value={description} onChange={(e) => { setDescription(e.target.value) }} ></textarea>
                        <label for="floatingTextarea2">Comments</label>
                    </div>
                </div>

                <div className="mb-3">
                    <label for="tag" className="form-label"><strong>Tag</strong></label>
                    <input type="text" className="form-control" id="tag" value={tag} onChange={(e) => { setTag(e.target.value) }} />
                    <div id="emailHelp" className="form-text">Divide your tags with a comma</div>
                </div>

                <div id="emailHelp" className="form-text mb-2">We'll never let your notes go public</div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="reset" className="btn btn-secondary mx-2">Reset</button>
            </form>
            <hr className="my-4 mx-5 hv-100" />



            <h2 className="container text-center">Your Notes</h2>

            <form
                className="d-flex my-3 w-50 container"
                role="search"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                    Search
                </button>
            </form>

            {(loading && notes.length === 0) ? (
                <p className="container text-center">
                    No notes available. Please add some notes.
                </p>
            ) : (
                <div className="container d-flex flex-row flex-wrap justify-content-between">
                    {notes
                        .filter(note =>
                            note.title.toLowerCase().includes(search.toLowerCase()) ||
                            note.tag.toLowerCase().includes(search.toLowerCase()) ||
                            note.description.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((note) => (
                            <div className="card container my-3" style={{ width: "18rem" }} key={note._id}>
                                <div className="card-body">
                                    <h5 className="card-title">{note.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                                    <p className="card-text">{note.description}</p>
                                    <Link to={`/updatenotes/${note._id}`} className="card-link">Edit</Link>
                                    <Link to={`/deleteNote/${note._id}`} className="card-link">Delete</Link>
                                </div>
                            </div>
                        ))}
                </div>
            )}

        </>
    )
}

export default Home
