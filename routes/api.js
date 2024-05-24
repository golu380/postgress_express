const express = require('express');
const dataController = require('../controller/dataController')
const projectController = require('../controller/projectController')
const auth = require('../middleware/auth')

const router = express.Router();


router.post('/register', dataController.register);
router.post('/login',dataController.login)

router.post('/project-register',auth,projectController.projectRegister)
router.get('/all-projects',projectController.getAllProject)
module.exports = router;