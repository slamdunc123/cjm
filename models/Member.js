const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MemberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Member = mongoose.model('member', MemberSchema);
