const student = require('../models/student');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ObjectID = require("mongoose").Types.ObjectId;



exports.newstudent = catchAsyncErrors(async(req, res, next) => {

    const { firstName,lastName, bio, email, media, resume, password } = req.body

    const student = await student.create({firstName,lastName, bio, email, media, resume, password  } );

   res.status(201).json({
     success : true,
     message : "student created successfully",
     student
   });

})

exports.getstudents = catchAsyncErrors(async (req, res, next) => {
    const students = await student.find();
    res.status(200).json({
      success: true,
      message: "students retrieved successfully",
      students
    });
  });

  exports.getstudentById = catchAsyncErrors(async (req, res, next) => {

    const studentId = req.params.id;
    const student = await student.findById(studentId);

    if (!student) {

      return res.status(404).json({
        success: false,
        message: "student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "student retrieved successfully",
      student
    });
  });

  exports.updqtestudent = catchAsyncErrors(async (req, res, next) => {
    const studentId = req.params.id;

    if (!ObjectID.isValid(studentId))
      return res.status(400).send("ID unknown: " + studentId);

    const updatedRecord = {

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio,
    };

      const updatedPost = await student.findByIdAndUpdate(studentId, { $set: updatedRecord }, { new: true }).exec();

      res.status(200).json({
        success: true,
        message: "student update successfully",
        updatedPost
      });


  });


  exports.deletePost = catchAsyncErrors(async (req, res, next) => {

    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  student.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err)
    res.status(200).json({
        success: true,
        message: "student remove successfully",
        student
      });
    else console.log("Delete error : " + err);
  });

  });

  exports.follow = catchAsyncErrors(async (req, res, next) => {

    const studentId = req.params.id;
    const followingId = req.body.followingId;


    const follower = await student.findById(studentId);
    const following = await student.findById(followingId);

    if (!ObjectID.isValid(studentId))
    return res.status(400).send('Invalid student ID: ' + studentId);


    if (!ObjectID.isValid(followingId))
      return res.status(400).send('Invalid following ID: ' + followingId);

    if (!follower || !following) {
        return res.status(400).json({
            success: false,
            message: "Follower or follewed not found"
        })
    }


      const studentFollow = await student.findByIdAndUpdate(
        studentId,
        {
          $addToSet: { following: following },
        },
        { new: true }
      );

      if (!studentFollow) {
        return res.status(404).send("following not found");
      }

      const studentFollowing = await student.findByIdAndUpdate(
        followingId,
        {
          $addToSet: { followers: follower },
        },
        { new: true }
      );

      if (!studentFollowing) {
        return res.status(404).send(" follower not found");
      }

      res.status(200).json({ success: true, message: "follow  successfully" });

  });


  exports.unfollow =catchAsyncErrors( async (req, res) => {
    const studentId = req.params.id;
    const followingId = req.body.followingId;

    if (!ObjectID.isValid(studentId))
      return res.status(400).send('Invalid student ID: ' + studentId);

    if (!ObjectID.isValid(followingId))
      return res.status(400).send('Invalid following ID: ' + followingId);

    const studentFollow = await student.findByIdAndUpdate(
      studentId,
      {
        $pull: { following: followingId },
      },
      { new: true }
    );

    if (!studentFollow) {
      return res.status(404).send("following not found");
    }

    const studentFollowing = await student.findByIdAndUpdate(
      followingId,
      {
        $pull: { followers: studentId },
      },
      { new: true }
    );

    if (!studentFollowing) {
      return res.status(404).send("follower not found");
    }

    res.status(200).json({ success: true, message: "unfollow successfully" });
  });


