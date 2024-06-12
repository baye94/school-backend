const express = require('express')
const { newclassroom, updateclassroom, deleteclassroom, getAllclassroom, getclassroomById} = require('../controllers/classroomControllers')
const router = express.Router()

router.route('/classroom').post(newclassroom)
router.route('/classroom/:id').put(updateclassroom)
router.route('/classroom/:id').delete(deleteclassroom)
router.route('/classrooms').get(getAllclassroom)
router.route('/classroom/:id').get(getclassroomById)

module.exports = router;
