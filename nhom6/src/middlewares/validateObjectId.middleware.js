const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid MongoDB ObjectId' });
  }
  next();
};

module.exports = validateObjectId;
