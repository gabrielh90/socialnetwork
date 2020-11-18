const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, Date.now() + '-' + file.originalname);
  },
});


let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");


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


let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
