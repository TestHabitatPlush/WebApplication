const multer = require('multer');
const path = require('path');
// const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png|pdf|xlsx|csv/;
    const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());

    const allowedMimetypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "text/csv"
    ];
    
    const mimetype = allowedMimetypes.includes(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only image files (jpeg, jpg, png) and PDF, Excel(.xlsx), or CSV files are allowed."));
    }
};



const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: fileFilter
});

module.exports = upload;

// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure upload directory exists
// const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
// if (!fs.existsSync(UPLOAD_DIR)) {
//     fs.mkdirSync(UPLOAD_DIR, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, UPLOAD_DIR);
//     },
//     filename: (req, file, cb) => {
//         const timestamp = Date.now();
//         const safeName = file.originalname.replace(/\s+/g, '_'); // replace spaces
//         cb(null, `${timestamp}_${safeName}`);
//     },
// });

// const fileFilter = (req, file, cb) => {
//     // Allowed file types
//     const allowedExtensions = /jpeg|jpg|png|pdf|xlsx|csv/;
//     const extname = allowedExtensions.test(
//         path.extname(file.originalname).toLowerCase()
//     );

//     const allowedMimetypes = [
//         "image/jpeg",
//         "image/jpg",
//         "image/png",
//         "application/pdf",
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//         "text/csv"
//     ];
    
//     const mimetype = allowedMimetypes.includes(file.mimetype);

//     if (extname && mimetype) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only image files (jpeg, jpg, png) and PDF, Excel(.xlsx), or CSV files are allowed."));
//     }
// };

// // Set file size limit to 5MB
// const upload = multer({
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter
// });

// module.exports = upload;
