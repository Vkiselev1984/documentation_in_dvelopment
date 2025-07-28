const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

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