const express = require('express');

const router = express.Router();


router.post('/data', dataController.addData);

module.exports = router;