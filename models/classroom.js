const mongoose = require('mongoose')

const classroomSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("classroom", classroomSchema);
                                                                                                                                                                                                                                                                                                                                                                                                                                                   