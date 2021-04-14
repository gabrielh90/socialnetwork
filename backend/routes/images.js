const {getImageList, downloadimage} = require("./../controllers/images");
const router = require('express').Router();

router.get("", getImageList);
router.route('/:name').get(downloadimage);


module.exports = router;