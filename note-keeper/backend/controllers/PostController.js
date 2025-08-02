class PostController {
  constructor(app, db) {

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


    app.get('/api/db/posts', (req, res) => {
      db.all('SELECT * FROM posts', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      });
    });

    app.put('/api/db/posts/:id', (req, res) => {
      const { title, content, categoryId } = req.body;
      db.run('UPDATE posts SET title=?, content=?, categoryId=? WHERE id=?',
        [title, content, categoryId, req.params.id],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ id: req.params.id, title, content, categoryId });
        }
      );
    });

    app.delete('/api/db/posts/:id', (req, res) => {
      db.run('DELETE FROM posts WHERE id=?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).end();
      });
    });
  }
}

module.exports = PostController;
