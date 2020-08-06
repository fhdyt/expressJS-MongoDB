const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  subject: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  },
});

mongoose.model('Feedback', feedbackSchema);
