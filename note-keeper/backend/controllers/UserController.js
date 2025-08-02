const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'your_jwt_secret'; // Use env in production

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  res.status(403).json({ error: 'Forbidden' });
}

class UserController {
  constructor(app, db) {
    // Register
    app.post('/api/register', async (req, res) => {
      const { id, username, password, role } = req.body;
      const hash = await bcrypt.hash(password, 10);
      db.run('INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)',
        [id, username, hash, role || 'user'],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ id, username, role: role || 'user' });
        }
      );
    });

    // Login
    app.post('/api/login', (req, res) => {
      const { username, password } = req.body;
      db.get('SELECT * FROM users WHERE username=?', [username], async (err, user) => {
        if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET, { expiresIn: '1d' });
        res.json({ token, role: user.role, username: user.username });
      });
    });

    // Get all users (admin only)
    app.get('/api/users', authMiddleware, requireAdmin, (req, res) => {
      db.all('SELECT id, username, role FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      });
    });
  }
}

module.exports = UserController;
module.exports.authMiddleware = authMiddleware;
module.exports.requireAdmin = requireAdmin;
