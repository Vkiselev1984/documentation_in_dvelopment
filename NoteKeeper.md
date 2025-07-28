# NoteKeeper Documentation

## 1. Overview

NoteKeeper is a simple web application for creating, editing, deleting, and searching notes. It consists of a React frontend and a Node.js (Express) backend API. Notes are stored on the server and can be accessed from any device.

## 2. Main Features

- Add, edit, and delete notes
- Persistent storage via backend API
- Simple and intuitive UI (Bootstrap)
- (Optional) Filtering and searching notes
- (Optional) Categorization of notes

## 3. User Scenarios (Use Cases)

### Add a Note

- User enters a title and content in the form
- User clicks "Add Note"
- Note appears in the list

### Edit a Note

- User clicks "Edit" on a note
- Note data appears in the form
- User changes data and clicks "Save Changes"
- Note updates in the list

### Delete a Note

- User clicks "Delete" on a note
- Note is removed from the list

### (Optional) Filter/Search Notes

- User enters a search query or selects a category
- List updates to show only matching notes

## 4. API Documentation

The backend API is implemented with Express and provides the following endpoints:

### Get all notes

```
GET /api/notes
```

Returns: Array of notes

### Add a note

```
POST /api/notes
Content-Type: application/json
Body: { id, title, content }
```

Returns: Created note

### Edit a note

```
PUT /api/notes/:id
Content-Type: application/json
Body: { id, title, content }
```

Returns: Updated note

### Delete a note

```
DELETE /api/notes/:id
```

Returns: 204 No Content

## 5. Data Model

A note has the following structure:

```js
{
  id: number,        // unique identifier
  title: string,     // note title
  content: string    // note content
}
```

## 6. Architecture

- **Frontend:** React (components: App, NoteForm, NoteList, NoteItem, CategoryFilter, SearchBar)
- **Backend:** Node.js + Express (server.js)
- **Data storage:** In-memory (for demo), can be extended to database
- **Communication:** REST API (JSON)

## 7. Business Process (Text)

1. User opens the app
2. App fetches notes from the server
3. User adds/edits/deletes notes
4. App sends changes to the server via API
5. Server updates notes and responds
6. App updates the UI

## 8. Sequence Diagram (Text)

1. User submits a new note in the UI
2. UI sends POST /api/notes to backend
3. Backend adds note and responds with created note
4. UI updates the list of notes

## 9. How to Run

### Backend

1. Install dependencies:
   ```
   npm install express cors
   ```
2. Start the server:
   ```
   node server.js
   ```
   Server runs on http://localhost:4000

### Frontend

1. Install dependencies:
   ```
   npm install
   ```
2. Start the app:
   ```
   npm start
   ```
   App runs on http://localhost:3000

## 10. Extending Functionality

- Add categories/tags (see CategoryFilter.js)
- Add search (see SearchBar.js)
- Add user authentication
- Persist notes in a database
- Add tests (Jest, React Testing Library)

---

## 11. Full Code Description and Examples

### Project Structure

```
note-keeper/
  src/
    components/
      App.js
      NoteForm.js
      NoteList.js
      NoteItem.js
      CategoryFilter.js
      SearchBar.js
    services/
      NoteService.js
    models/
      Note.js
  server.js
```

### Frontend

#### App.js

- Main component, manages notes state and handlers for add, delete, edit.
- Example add note function:
  ```js
  const handleAddNote = (note) => {
    noteService.addNote(note);
    setNotes(noteService.getNotes());
  };
  ```

#### NoteForm.js

- Form for adding and editing notes.
- Uses useState and useEffect for field management.
- Example:
  ```js
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingNote) {
      onEditNote({ ...editingNote, title, content });
    } else {
      const newNote = new Note(Date.now(), title, content);
      onAddNote(newNote);
    }
    setTitle("");
    setContent("");
  };
  ```

#### NoteList.js and NoteItem.js

- NoteList renders a list of notes, NoteItem renders a single note with "Edit" and "Delete" buttons.

#### CategoryFilter.js, SearchBar.js

- (Optional) Filtering and searching notes.

### Backend

#### server.js

- Implements REST API for notes.
- Example endpoint:
  ```js
  app.get("/api/notes", (req, res) => {
    res.json(notes);
  });
  ```

### Swagger/OpenAPI Specification

See [openapi.yaml](./openapi.yaml) for the full API specification.

### Example Requests and Responses

**Add a note:**

```http
POST /api/notes
Content-Type: application/json

{
  "id": 123,
  "title": "Example",
  "content": "This is a note"
}
```

**Response:**

```json
{
  "id": 123,
  "title": "Example",
  "content": "This is a note"
}
```

For more details, see the code and component files (e.g., `CategoryFilter.js`).
