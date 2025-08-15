import React, { useEffect, useState } from 'react';
import NotesContext from './NotesContext';
import axios from 'axios';
import Loader from '../components/Loader';

const NotesState = (props) => {
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        if (!localStorage.getItem("authToken")) {
            setLoading(false);
            return;
        }

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
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <>
            <NotesContext.Provider value={{ notes, setNotes, fetchNotes }}>
                {loading ? <Loader count={6} /> : props.children}
            </NotesContext.Provider>
        </>
    );



};

export default NotesState;
