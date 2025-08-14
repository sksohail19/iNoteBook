const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const NoteBook = require('../models/NotebookSchema'); // Assuming you have a NoteBook model defined
const fetchNotes = require('../middleware/fetchNotes'); // Middleware to fetch user from token
const fetchUser = require('../middleware/fetchUser'); // Middleware to fetch user from token

router.post("/newNotes", fetchUser, [
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
    body('tag', 'Tag is required').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        const note = new NoteBook({
            user: req.user.id, // ✅ req.user now exists
            title,
            description,
            tag
        });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/fetchAllNotes", fetchUser, async (req, res) => {
    try {
        const notes = await NoteBook.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


router.put("/updatenotes/:id", fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }
    try {
        // Find the note to be updated
        let note = await NoteBook.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        // Check if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // Update the note
        note = await NoteBook.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await NoteBook.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        // Check if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // Delete the note
        note = await NoteBook.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;