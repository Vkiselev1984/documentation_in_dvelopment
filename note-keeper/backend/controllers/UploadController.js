const multer = require('multer');
const path = require('path');
const fs = require('fs');

class UploadController {
  constructor(app) {
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
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

    app.post('/api/upload', upload.single('image'), (req, res) => {
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
      res.json({ imageUrl: `/uploads/${req.file.filename}` });
    });
  }
}

module.exports = UploadController;
