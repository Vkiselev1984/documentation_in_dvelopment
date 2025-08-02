class ImageController {
  constructor(app, db) {
    app.get('/api/db/images', (req, res) => {
      db.all('SELECT * FROM images', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      });
    });

    app.get('/api/db/images/:postId', (req, res) => {
      db.all('SELECT * FROM images WHERE postId=?', [req.params.postId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      });
    });

    app.post('/api/db/images', (req, res) => {
      const { id, postId, imageUrl } = req.body;
      db.run('INSERT INTO images (id, postId, imageUrl) VALUES (?, ?, ?)',
        [id, postId, imageUrl],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ id, postId, imageUrl });
        }
      );
    });

    app.delete('/api/db/images/:id', (req, res) => {
      db.run('DELETE FROM images WHERE id=?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).end();
      });
    });


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

  }
}

module.exports = ImageController;
