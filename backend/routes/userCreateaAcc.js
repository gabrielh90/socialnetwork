const uploadFile = require("../middleware/upload");
const userProfie = require('../models/userProfile.model')

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    if (req.file === undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    var fs = require('fs');
    var imageData = fs.readFileSync(req.file.path);

    const username = req.body.username;
    const password = req.body.password;

    const newUser = new userProfie({
        userId: 'asdasd',
        firstName: 'Pricolici',
        lastName: 'Pricolescu',
        userAvatar: imageData,
        avatarType: 'image/png'
    });
    // fs.writeFileSync(__basedir + '/resources/static/assets/uploads/tmp-me.png', imageData);

    newUser.save()
        .then(img => {
          console.log("Saved an image 'jsa-header.png' to MongoDB." + img);
          // Find the stored image in MongoDB, then save it in '/static/assets/tmp' folder
          userProfie.findById(img, (err, findOutImage) => {
            if (err) throw err;
            try{
              fs.writeFileSync(__basedir + '/resources/static/assets/uploads/tmp-jsa-header.png', findOutImage.userAvatar);
              console.log("Stored an image 'tmp-jsa-header.png' in '/static/assets/tmp' folder.");
            }catch(e){
              console.log(e);
            }
          });
        })
    res.status(200).send(req.file)
    // res.status(200).send({
    //   message: "Uploaded the file successfully: " + req.file.originalname,
    // });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
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
        url: baseUrl+ '/files/' + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

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
