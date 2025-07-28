// src/models/Note.js
class Note {
    constructor(id, title, content, category = 'general') {
        this.id = id;           // Уникальный идентификатор заметки
        this.title = title;     // Заголовок заметки
        this.content = content; // Содержимое заметки
        this.category = category; // Категория заметки (по умолчанию 'general')
    }
}

export default Note; // Экспортируем класс для использования в других файлах