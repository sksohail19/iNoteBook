import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import NotesContext from '../context/NotesContext';

function Home() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");

    const { notes } = useContext(NotesContext);
    console.log(notes);

    return (    
        <>
            <h1 className="container my-3 ">Welcome to iNoteBook</h1>
            <p className="container">Here you can add your notes and manage them easily.</p>
            <hr className="my-4 mx-5 hv-100" />
            <h2 className="container text-center">Add a Note</h2>
            <p className="container text-center">Add your notes below:</p>
            <form className="container my-3" >
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
            <div className="container d-flex flex-row flex-wrap justify-content-between h-30">
                {notes.map((note, index) =>
                    <div className="card container my-3" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{notes[index].title}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{notes[index].tag}</h6>
                            <p className="card-text">{notes[index].description}</p>
                            <Link to="/updatenotes/:id" className="card-link  ">Edit</Link>
                            <Link to="/deleteNote/:id" className="card-link ">Delete</Link>
                        </div>
                    </div>
                )};
            </div>
        </>
    )
}

export default Home
