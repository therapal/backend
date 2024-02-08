const { reviews: Review } = require("../models");

const { ApiError } = require("../utils/errors");
const { catchAsyncErrors } = require("../routes/middlewares/errors");

module.exports.createTherapistReview = catchAsyncErrors(
  async (req, res, next) => {
    if (req.body.review === "") {
      return next(new ApiError("Review cannot be empty", 400));
    }
    await Review.create({
      clientId: req.user.id,
      content: req.body.review,
    });
    return res.status(201).json({
      success: true,
      message: "Review created",
    });
  },
);
