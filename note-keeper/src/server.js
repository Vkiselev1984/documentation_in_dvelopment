const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./note-keeper.db');
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        icon TEXT,
        description TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        categoryId TEXT NOT NULL,
        FOREIGN KEY (categoryId) REFERENCES categories(id)
    )`);
});

app.use(cors());
app.use(express.json());

let notes = [];

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const note = req.body;
    notes.push(note);
    res.status(201).json(note);
});

app.put('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const updatedNote = req.body;
    notes = notes.map(note => note.id === id ? updatedNote : note);
    res.json(updatedNote);
});

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});