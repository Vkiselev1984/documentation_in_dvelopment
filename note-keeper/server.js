const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Инициализация базы данных
const db = new sqlite3.Database('./note-keeper.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        icon TEXT,
        description TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        categoryId TEXT NOT NULL,
        FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS images (
        id TEXT PRIMARY KEY,
        postId TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE
    )`);
});

// File upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// CRUD для категорий
app.get('/api/categories', (req, res) => {
    db.all('SELECT * FROM categories', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/categories', (req, res) => {
    const { id, name, color, icon, description } = req.body;
    db.run('INSERT INTO categories (id, name, color, icon, description) VALUES (?, ?, ?, ?, ?)',
        [id, name, color, icon, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id, name, color, icon, description });
        }
    );
});

app.put('/api/categories/:id', (req, res) => {
    const { name, color, icon, description } = req.body;
    db.run('UPDATE categories SET name=?, color=?, icon=?, description=? WHERE id=?',
        [name, color, icon, description, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: req.params.id, name, color, icon, description });
        }
    );
});

app.delete('/api/categories/:id', (req, res) => {
    db.run('DELETE FROM categories WHERE id=?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).end();
    });
});

// CRUD для постов
app.get('/api/posts', (req, res) => {
    db.all('SELECT * FROM posts', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/posts', (req, res) => {
    const { id, title, content, categoryId } = req.body;
    db.run('INSERT INTO posts (id, title, content, categoryId) VALUES (?, ?, ?, ?)',
        [id, title, content, categoryId],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id, title, content, categoryId });
        }
    );
});

app.put('/api/posts/:id', (req, res) => {
    const { title, content, categoryId } = req.body;
    db.run('UPDATE posts SET title=?, content=?, categoryId=? WHERE id=?',
        [title, content, categoryId, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: req.params.id, title, content, categoryId });
        }
    );
});

app.delete('/api/posts/:id', (req, res) => {
    db.run('DELETE FROM posts WHERE id=?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).end();
    });
});

// API для просмотра содержимого БД
app.get('/api/db/posts', (req, res) => {
    db.all('SELECT * FROM posts', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
app.get('/api/db/categories', (req, res) => {
    db.all('SELECT * FROM categories', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
app.get('/api/db/images', (req, res) => {
    db.all('SELECT * FROM images', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Универсальное удаление записи по id
app.delete('/api/db/:table/:id', (req, res) => {
    const { table, id } = req.params;
    if (!['posts', 'categories', 'images'].includes(table)) return res.status(400).json({ error: 'Invalid table' });
    db.run(`DELETE FROM ${table} WHERE id=?`, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).end();
    });
});

// Универсальное обновление записи по id
app.put('/api/db/:table/:id', (req, res) => {
    const { table, id } = req.params;
    const data = req.body;
    if (!['posts', 'categories', 'images'].includes(table)) return res.status(400).json({ error: 'Invalid table' });
    const keys = Object.keys(data).filter(k => k !== 'id');
    const values = keys.map(k => data[k]);
    if (keys.length === 0) return res.status(400).json({ error: 'No fields to update' });
    const setClause = keys.map(k => `${k}=?`).join(', ');
    db.run(`UPDATE ${table} SET ${setClause} WHERE id=?`, [...values, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id, ...data });
    });
});

// CRUD для изображений
app.get('/api/images', (req, res) => {
    db.all('SELECT * FROM images', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/api/images/:postId', (req, res) => {
    db.all('SELECT * FROM images WHERE postId=?', [req.params.postId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/images', (req, res) => {
    const { id, postId, imageUrl } = req.body;
    db.run('INSERT INTO images (id, postId, imageUrl) VALUES (?, ?, ?)',
        [id, postId, imageUrl],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id, postId, imageUrl });
        }
    );
});

app.delete('/api/images/:id', (req, res) => {
    db.run('DELETE FROM images WHERE id=?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).end();
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
