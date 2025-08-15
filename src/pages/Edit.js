import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Edit() {
    const navigate = useNavigate();
    const id = useParams().id;

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [tag, setTag] = React.useState("");

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/notes/getNote/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': localStorage.getItem("authToken")
                    }
                })

                if (res.status === 200) {
                    setTitle(res.data.title);
                    setDescription(res.data.description);
                    setTag(res.data.tag);
                }
                else {
                    alert("Failed to fetch note: " + res.data.message);
                    navigate("/");
                }
            }
            catch (err) {
                console.error("Error fetching note:", err);
                alert("Could not load note for editing.");
                navigate("/");
            }
        }
        fetchNote();
    }, [id, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logic to handle note submission
        try {
            if (!!localStorage.getItem("authToken")) {
                // Assuming you have an API endpoint to handle note updates
                await axios.put("http://localhost:5000/api/notes/updateNote", {
                    title,
                    description,
                    tag
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': localStorage.getItem("authToken")
                    }
                });


                alert("Note updated successfully!");
                navigate("/");
            } else {
                alert("Please login to update notes");
            }
            //const res = await axios.put()

        } catch (error) {
            if (error.response) {
                alert(`Login failed: ${error.response.data.message}`);
            } else {
                alert("Network error. Please try again.");
            }
            console.error("Error during login:", error);
        }
        console.log("Note submitted:", { title, description, tag });
    }

    
    return (
        <>
            <form className="container my-3" onSubmit={handleSubmit} >
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
                <button type="button" className="btn btn-secondary mx-2" onClick={() => navigate("/")}>Cancel</button>
            </form>
        </>
    )
}

export default Edit
