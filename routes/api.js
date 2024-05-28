const express = require('express');
const dataController = require('../controller/dataController')
const projectController = require('../controller/projectController')
const bidController = require('../controller/bidController')
const auth = require('../middleware/auth')

const router = express.Router();


router.post('/register', dataController.register);
router.post('/login',dataController.login)

router.post('/project-register',auth,projectController.projectRegister)
router.get('/all-projects',projectController.getAllProject)

router.post('/bid_project/:project_id',auth,bidController.bid_rgistry)
router.post('file/upload',auth,)
module.exports = router;