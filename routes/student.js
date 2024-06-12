const express = require('express')
const router = express.Router()
const {
     newstudent,
     getstudents ,
     getstudentById ,
     updqtestudent
    } = require('../controllers/studentControllers');


router.route('/student').post(newstudent)
router.route('/student').get(getstudents);
router.route('/student/:id').get(getstudentById);
router.route('/student/:id').put(updqtestudent)

module.exports = router;