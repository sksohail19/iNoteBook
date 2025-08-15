import React, { useEffect, useState } from 'react';
import NotesContext from './NotesContext';
import axios from 'axios';

const NotesState = (props) => {

    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        if (!localStorage.getItem("authToken")) return;

        try {
            const res = await axios.get("http://localhost:5000/api/notes/fetchallnotes", {
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem("authToken"),
                },
            });
            setNotes(res.data);
        } catch (err) {
            console.error("Error fetching notes:", err);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <NotesContext.Provider value={{ notes, setNotes, fetchNotes }}>
            {props.children}
        </NotesContext.Provider>
    );



};

export default NotesState;
