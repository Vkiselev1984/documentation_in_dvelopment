import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import noteService from '../services/NoteService';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

const App = () => {
    const [notes, setNotes] = useState(noteService.getNotes());
    const [editingNote, setEditingNote] = useState(null);

    const handleAddNote = (note) => {
        noteService.addNote(note);
        setNotes(noteService.getNotes());
    };

    const handleDeleteNote = (id) => {
        noteService.deleteNote(id);
        setNotes(noteService.getNotes());
        // Если удаляем редактируемую заметку — сбрасываем форму
        if (editingNote && editingNote.id === id) {
            setEditingNote(null);
        }
    };

    const handleEditStart = (note) => {
        setEditingNote(note);
    };

    const handleEditNote = (updatedNote) => {
        noteService.editNote(updatedNote);
        setNotes(noteService.getNotes());
        setEditingNote(null);
    };

    return (
        <div className="container">
            <h1 className="mt-4">NoteKeeper</h1>
            <NoteForm
                onAddNote={handleAddNote}
                editingNote={editingNote}
                onEditNote={handleEditNote}
            />
            <NoteList
                notes={notes}
                onDeleteNote={handleDeleteNote}
                onEditNote={handleEditStart}
            />
        </div>
    );
};

export default App;