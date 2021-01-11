const util = require("util");
const multer = require("multer");
const maxSize = 20000000000 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/images/");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
});


let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
});


// var upload = multer({  
//   storage: storage, 
//   limits: { fileSize: maxSize }, 
//   fileFilter: function (req, file, cb){ 
  
//       // Set the filetypes, it is optional 
//       var filetypes = /jpeg|jpg|png/; 
//       var mimetype = filetypes.test(file.mimetype); 

//       var extname = filetypes.test(path.extname( 
//                   file.originalname).toLowerCase()); 
      
//       if (mimetype && extname) { 
//           return cb(null, true); 
//       } 
    
//       cb("Error: File upload only supports the "
//               + "following filetypes - " + filetypes); 
//     }  

// // mypic is the name of file attribute 
// }).single("mypic");        


let uploadImage = util.promisify(uploadFile.single("file"));
let uploadImages = util.promisify(uploadFile.array("files", 12));
module.exports = {
  uploadImage, 
  uploadImages
}
