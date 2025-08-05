const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteBookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const NoteBook = mongoose.model('notebook', NoteBookSchema);
module.exports = NoteBook;