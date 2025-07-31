class CategoryController {
  constructor(app, db) {
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
  }
}

module.exports = CategoryController;
