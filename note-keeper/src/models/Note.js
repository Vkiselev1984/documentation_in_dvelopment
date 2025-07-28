// src/models/Note.js
class Note {
    constructor(id, title, content, categoryId) {
        this.id = id;           // Unique note identifier
        this.title = title;     // Note title
        this.content = content; // Note content
        this.categoryId = categoryId; // Category id (required)
    }
}

export default Note; // Экспортируем класс для использования в других файлах