import { useState, useEffect } from 'react';
import Note from '../models/Note';

const NoteForm = ({ onAddNote, editingNote, onEditNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setContent(editingNote.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [editingNote]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '' || content.trim() === '') return;

        if (editingNote) {
            onEditNote({ ...editingNote, title, content });
        } else {
            const newNote = new Note(Date.now(), title, content);
            onAddNote(newNote);
        }
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    placeholder="Title"
                    required
                />
            </div>
            <div className="mb-3">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-control"
                    placeholder="Content"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                {editingNote ? 'Save Changes' : 'Add Note'}
            </button>
        </form>
    );
};

export default NoteForm;
