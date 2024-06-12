const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

 const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
     bio: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 1000,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        unique: true,
    },

     countryCode: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    parentFirstName: {
        type: String,
        required: true,
    },
    parentLastName: {
        type: String,
        required: true,
    },
    parentPhone: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    class: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom'
    }]
  });

  module.exports = mongoose.model("student", studentSchema);

