const express = require('express');
const dataController = require('../controller/dataController')

const router = express.Router();


router.post('/register', dataController.register);

module.exports = router;