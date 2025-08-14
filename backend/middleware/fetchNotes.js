const NoteBook = require('../models/NotebookSchema'); // Assuming you have a NoteBook model defined
const fetchUser = require('../middleware/fetchUser'); // Middleware to fetch user from token
const fetchNotes = async (req, res, next) => {
    try {
        const notes = await NoteBook.find({ user: req.user.id });
        req.notes = notes;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = fetchNotes;