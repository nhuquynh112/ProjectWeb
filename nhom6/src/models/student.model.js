const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, 'studentId is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    score: {
      type: Number,
      min: [0, 'score must be >= 0'],
      max: [100, 'score must be <= 100'],
      default: 0,
    },
    major: {
      type: String,
      enum: {
        values: ['IT', 'Business', 'Design', 'Marketing'],
        message: 'major must be one of: IT, Business, Design, Marketing',
      },
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
