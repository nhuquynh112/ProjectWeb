const studentService = require('../services/student.service');

// POST /api/students
const createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

// GET /api/students
const getStudents = async (req, res, next) => {
  try {
    const { page, limit, major } = req.query;
    const result = await studentService.getStudents({ page, limit, major });
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

// GET /api/students/top
const getTopStudents = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const students = await studentService.getTopStudents(limit);
    res.json({ success: true, data: students });
  } catch (err) {
    next(err);
  }
};

// GET /api/students/stats/avg
const getAverageScore = async (req, res, next) => {
  try {
    const stats = await studentService.getAverageScore();
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
};

// GET /api/students/search
const searchStudents = async (req, res, next) => {
  try {
    const { q } = req.query;
    const students = await studentService.searchStudents(q);
    res.json({ success: true, data: students });
  } catch (err) {
    next(err);
  }
};

// GET /api/students/:id
const getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    res.json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

// PUT /api/students/:id
const updateStudent = async (req, res, next) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);
    res.json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/students/:id
const deleteStudent = async (req, res, next) => {
  try {
    await studentService.deleteStudent(req.params.id);
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/students/:id/score
const updateScore = async (req, res, next) => {
  try {
    const student = await studentService.updateScore(req.params.id, req.body.score);
    res.json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  updateScore,
  getTopStudents,
  getAverageScore,
  searchStudents,
};
