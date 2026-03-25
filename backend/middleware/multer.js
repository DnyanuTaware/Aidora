import multer from "multer";

const storage = multer.memoryStorage();

export const uploadFile = multer({ storage }).single("file");

// For multiple file upload (e.g., DigiLocker documents)
export const uploadFiles = multer().fields([
  { name: "adhar", maxcount: 1 },
  { name: "pan", maxCount: 1 },
  { name: "income", maxCount: 1 },
  { name: "marksheet10", maxCount: 1 },
  { name: "marksheet12", maxcount: 1 },
]);
