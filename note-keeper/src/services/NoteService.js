import INoteService from '../interfaces/INoteService';

const STORAGE_KEY = 'notes';

class NoteService extends INoteService {
    getNotes() {
        const notes = localStorage.getItem(STORAGE_KEY);
        return notes ? JSON.parse(notes) : [];
    }

    addNote(note) {
        const notes = this.getNotes();
        notes.push(note);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }

    editNote(updatedNote) {
        const notes = this.getNotes().map(note =>
            note.id === updatedNote.id ? updatedNote : note
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }

    deleteNote(id) {
        const notes = this.getNotes().filter(note => note.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
}

const instance = new NoteService();
Object.freeze(instance);
export default instance;