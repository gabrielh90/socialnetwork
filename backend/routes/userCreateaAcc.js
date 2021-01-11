const {uploadImage} = require("../middleware/upload");
const userAccount = require('../models/userAccount.model');

const upload = async (req, res) => {
  try {
    await uploadImage(req, res)
    .catch((error) => {
        console.log(error);
    });
    if (req.file === undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    console.log(req.file);
    var fs = require('fs');
    var imageData = fs.readFileSync(req.file.path);
    const newUser = new userAccount({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        userAvatar: imageData,
        avatarType: req.file.mimetype,
        avatarName: req.file.originalname,
        bornDate: new Date(req.body.year + '-' + req.body.month + '-' + req.body.day)
    });
    // fs.writeFileSync(__basedir + '/images/tmp-me.png', imageData);
    
    newUser.save()
          .then(img => {
            console.log("Account saved into DB" + img);
            // Find the stored image in MongoDB, then save it in '/static/assets/tmp' folder
            // userAccount.findById(img, (err, findOutImage) => {
            //   if (err) throw err;
            //   try{
            //     fs.writeFileSync(__basedir + '/images/tmp-jsa-header.png', findOutImage.userAvatar);
            //     console.log("Stored an image 'tmp-jsa-header.png' in '/static/assets/tmp' folder.");
            //   }catch(e){
            //     console.log(e);
            //   }
            // });
          })

    fs.unlinkSync(req.file.path);
    res.status(200).send({
      message: "Account Created",
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};


const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/images/";
  const fs = require('fs');
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl.trim() + '/files/' + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/images/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};
