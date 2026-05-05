const Student = require('../models/student.model');

class StudentService {
  // Tạo sinh viên mới
  async createStudent(data) {
    const student = new Student(data);
    return await student.save();
  }

  // Lấy danh sách sinh viên (pagination + filter by major)
  async getStudents({ page = 1, limit = 10, major } = {}) {
    const query = { isActive: true };
    if (major) query.major = major;

    const skip = (page - 1) * limit;
    const [students, total] = await Promise.all([
      Student.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Student.countDocuments(query),
    ]);

    return {
      students,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Lấy chi tiết sinh viên theo _id
  async getStudentById(id) {
    const student = await Student.findOne({ _id: id, isActive: true });
    if (!student) throw { status: 404, message: 'Student not found' };
    return student;
  }

  // Cập nhật sinh viên
  async updateStudent(id, data) {
    // Không cho phép cập nhật isActive qua route này
    delete data.isActive;

    const student = await Student.findOneAndUpdate(
      { _id: id, isActive: true },
      data,
      { new: true, runValidators: true }
    );
    if (!student) throw { status: 404, message: 'Student not found' };
    return student;
  }

  // Xóa mềm (soft delete)
  async deleteStudent(id) {
    const student = await Student.findOneAndUpdate(
      { _id: id, isActive: true },
      { isActive: false },
      { new: true }
    );
    if (!student) throw { status: 404, message: 'Student not found' };
    return student;
  }

  // Cập nhật điểm số
  async updateScore(id, score) {
    if (score === undefined || score === null)
      throw { status: 400, message: 'score is required' };
    if (typeof score !== 'number' || score < 0 || score > 100)
      throw { status: 400, message: 'score must be a number between 0 and 100' };

    const student = await Student.findOneAndUpdate(
      { _id: id, isActive: true },
      { score },
      { new: true }
    );
    if (!student) throw { status: 404, message: 'Student not found' };
    return student;
  }

  // Top sinh viên theo điểm
  async getTopStudents(limit = 5) {
    return await Student.find({ isActive: true })
      .sort({ score: -1 })
      .limit(Number(limit));
  }

  // Điểm trung bình
  async getAverageScore() {
    const result = await Student.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, avgScore: { $avg: '$score' }, total: { $sum: 1 } } },
    ]);
    return result[0] || { avgScore: 0, total: 0 };
  }

  // Tìm kiếm sinh viên theo tên
  async searchStudents(q) {
    if (!q) throw { status: 400, message: 'Query parameter q is required' };
    return await Student.find({
      isActive: true,
      name: { $regex: q, $options: 'i' },
    });
  }
}

module.exports = new StudentService();
