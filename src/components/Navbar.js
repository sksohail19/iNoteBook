import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import NotesContext from '../context/NotesContext';

function Navbar() {
    const navigate = useNavigate();
    const { notes } = React.useContext(NotesContext);
    const isLoggedIn = () => {
        return !!localStorage.getItem("authToken");
    }

    const handleChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();   
        const filteredNotes = notes.filter(note => 
            note.title.toLowerCase().includes(searchTerm) || 
            note.description.toLowerCase().includes(searchTerm)
        );
        console.log(filteredNotes);
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="https://sksohail19.github.io/Portfolio/" target="_blank">About</a>
                            </li>

                            {!isLoggedIn() && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="/signup">Don't Have an Account?</Link>
                                    </li>
                                </>
                            )}


                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/contact">Contact</Link>
                            </li>

                            {isLoggedIn() && (
                                <button
                                    className={`nav-link btn btn-link ${localStorage.getItem("authToken") ? "active" : "disabled"}`}
                                    aria-current="page"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            )}
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit" onChange={() => handleChange}>Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <hr />
        </>
    )
}

export default Navbar
