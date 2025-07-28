const STORAGE_KEY = 'notes';

class NoteStorageService {
    getAll() {
        const notes = localStorage.getItem(STORAGE_KEY);
        return notes ? JSON.parse(notes) : [];
    }

    saveAll(notes) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }

    add(note) {
        const notes = this.getAll();
        notes.push(note);
        this.saveAll(notes);
    }

    remove(id) {
        const notes = this.getAll().filter(note => note.id !== id);
        this.saveAll(notes);
    }

    update(updatedNote) {
        const notes = this.getAll().map(note =>
            note.id === updatedNote.id ? updatedNote : note
        );
        this.saveAll(notes);
    }
}

const noteStorageService = new NoteStorageService();
export default noteStorageService;