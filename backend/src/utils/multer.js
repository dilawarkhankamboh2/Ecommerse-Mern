const multer = require("multer");

const upload = multer.diskStorage({
    
  destination(callback, req, res) {
    callback(null, `uploads/${req.fieldname}`);
  },

  filename(callback, req, res) {
    callback(null, `${Date.now()}-${req.path}`);
  },
});

module.exports = upload;
