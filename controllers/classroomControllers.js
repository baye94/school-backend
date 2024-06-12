const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Classroom = require("../models/classroom");

exports.newclassroom = catchAsyncErrors(async(req, res, next) => {

    const classroom = await Classroom.create(req.body)

    if (!classroom) {
        return next(new Error('Failed to create classroom'));
    }

    res.status(201).json({
        success : true,
        message : "classroom created successfully",
        classroom
    })
})

exports.updateclassroom = catchAsyncErrors(async(req, res, next) => {

    let classroom = await classroom.findById(req.params.id)

    if (!classroom) {
        return next(new Error('classroom not found'));
    }

    classroom = await classroom.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators: true,
        useFindAndModify : true
    })
    res.status(200).json({
        success: true,
        message: "classroom updated successfully",
        classroom
    });

})

exports.getclassroomById = catchAsyncErrors(async (req, res, next) => {

    const classroom = await classroom.findById(req.params.id);

    if (!classroom) {
        return next(new Error('classroom not found'));
    }

    res.status(200).json({
        success: true,
        classroom
    });
})

exports.getAllclassroom = catchAsyncErrors(async (req, res, next) => {

    const classroom = await classroom.find()

    res.status(201).json({
        success : true,
        count: classroom.length,
        classroom
    })

})

exports.deleteclassroom = catchAsyncErrors (async (req, res, next) => {

    const classroom = await classroom.findById(req.params.id);

    if (!classroom) {
        return next(new Error('classroom not found'));
    }

    await classroom.deleteOne;

    res.status(200).json({
        success: true,
        message: "classroom deleted successfully"
    });
})
