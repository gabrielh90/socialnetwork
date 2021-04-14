
const asyncHandler = require('./../middleware/async');
const fs = require('fs');

const getImageList = (req, res) => {
  const directoryPath = __basedir + "/images/";

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

const downloadimage = asyncHandler(async (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/images/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
        res.status(500).send({
            message: "Could not download the file. " + err,
        });
        }
    });
});

module.exports = {
    getImageList,
    downloadimage,
};
