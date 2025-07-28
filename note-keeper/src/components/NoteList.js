import NoteItem from './NoteItem';

const NoteList = ({ notes, onDeleteNote, onEditNote }) => {
    return (
        <ul className="list-group">
            {notes.map(note => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onDeleteNote={onDeleteNote}
                    onEditNote={onEditNote}
                />
            ))}
        </ul>
    );
};

export default NoteList;