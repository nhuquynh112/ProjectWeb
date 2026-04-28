const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const validateObjectId = require('../middlewares/validateObjectId.middleware');

// --- Advanced routes (must be before /:id to avoid conflicts) ---
router.get('/top', studentController.getTopStudents);
router.get('/stats/avg', studentController.getAverageScore);
router.get('/search', studentController.searchStudents);

// --- Basic CRUD ---
router.post('/', studentController.createStudent);
router.get('/', studentController.getStudents);

router.get('/:id', validateObjectId, studentController.getStudentById);
router.put('/:id', validateObjectId, studentController.updateStudent);
router.delete('/:id', validateObjectId, studentController.deleteStudent);

// --- Update score ---
router.patch('/:id/score', validateObjectId, studentController.updateScore);

module.exports = router;
