import multer from "multer";

const storage = multer.memoryStorage();

const singleUpload = multer({ storage });

export default singleUpload;