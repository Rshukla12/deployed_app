const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb( null, Date.now() + file.originalname );
    },
    destination: (req, file, cb) => {
        cb( null, path.join(__dirname, "../public", "uploads"));    
    }
});

const fileFilter = (req, file, cb) => {
    const allowedType = new Set(["image/jpg", "image/png", "image/jpeg"]);
    if ( allowedType.has(file.mimetype) ){
        cb(null, true);
    } else {
        cb(new Error("Only images of type jpg/jpeg/png is allowed!") );
    }
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;