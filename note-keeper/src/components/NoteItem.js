
const NoteItem = ({ note, onDeleteNote, onEditNote }) => {
    return (
        <li className="list-group-item">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button className="btn btn-danger" onClick={() => onDeleteNote(note.id)}>Delete</button>
            <button className="btn btn-secondary ms-2" onClick={() => onEditNote(note)}>Edit</button>
        </li>
    );
};
export default NoteItem;