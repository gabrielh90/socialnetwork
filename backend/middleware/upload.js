const util = require("util");
const multer = require("multer");
const maxSize = 20000000000 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // if(file.fieldname==="avatar")
    // {
    // cb(null, __basedir + "\\images\\avatars")
    // } else {}
    cb(null, __basedir + "\\images\\");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    // if(file.fieldname==="avatar"){
    //   cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
    // } else {}
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniquePrefix + '-' + file.originalname)
  },
});


let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
});


// var upload = multer({
//   storage: storage, 
//   limits: { fileSize: maxSize }, 
//   // fileFilter: function (req, file, cb){
//   //   // Set the filetypes, it is optional 
//   //   var filetypes = /jpeg|jpg|png/; 
//   //   var mimetype = filetypes.test(file.mimetype); 

//   //   var extname = filetypes.test(path.extname(
//   //               file.originalname).toLowerCase()); 
    
//   //   if (mimetype && extname) { 
//   //       return cb(null, true); 
//   //   } 
  
//   //   cb("Error: File upload only supports the "
//   //           + "following filetypes - " + filetypes); 
//   // } 

// }).fields([{name: 'avatar', maxCount: 1}, {name: 'coverPhoto', maxCount: 1}]);


let uploadImage = util.promisify(uploadFile.single("file"));
let uploadImages = util.promisify(uploadFile.array("files", 12));
// let upload = util.promisify(uploadFile.fields([{name: 'avatar', maxCount: 1}, {name: 'coverPhoto', maxCount: 1}]));
let upload = util.promisify(uploadFile.fields([{ name: 'avatar', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }]));
// let upload = util.promisify(uploadFile.any());

module.exports = {
  uploadImage, 
  uploadImages,
  upload
}
