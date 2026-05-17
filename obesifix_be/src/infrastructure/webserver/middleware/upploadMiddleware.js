import multer from "multer";
import path from "path";

// storage pakai memory, jadi file langsung di buffer
const storage = multer.memoryStorage();

// filter untuk validasi file type
function fileFilter(req, file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg and .png files are allowed!"));
  }
}

// bikin middleware multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 4 * 1024 * 1024 }, // max 2MB
});

export default upload;
