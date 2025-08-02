const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;

const DatabaseService = require('./db/DatabaseService');
const db = DatabaseService.getDb();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const CategoryController = require('./controllers/CategoryController');
const PostController = require('./controllers/PostController');
const ImageController = require('./controllers/ImageController');
const UploadController = require('./controllers/UploadController');
const SwaggerController = require('./controllers/SwaggerController');
const UserController = require('./controllers/UserController');

new UserController(app, db);
new CategoryController(app, db);
new PostController(app, db);
new ImageController(app, db);
new UploadController(app);
new SwaggerController(app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});