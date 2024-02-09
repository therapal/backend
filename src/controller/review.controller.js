const { reviews: Review, users: User } = require("../models");

const { ApiError } = require("../utils/errors");
const { catchAsyncErrors } = require("../routes/middlewares/errors");

module.exports.createTherapistReview = catchAsyncErrors(
  async (req, res, next) => {
    const {content, rating} = req.body
    if (!content || !rating || typeof content !== 'string' || typeof rating !== 'number') {
      return next(new ApiError("Invalid request body", 400));
    }
    if (req.body.review === "") {
      return next(new ApiError("Review cannot be empty", 400));
    }
    await Review.create({
      clientId: req.user.id,
      content,
      rating
    });
    return res.status(201).json({
      success: true,
      message: "Review created",
    });
  },
);

module.exports.getTherapistReview = catchAsyncErrors(
  async (req, res, next) => {
    const {therapistId, page = 1, pageSize = 10} = req.query
    const offset = (page - 1) * pageSize;

    if (!therapistId) {
      return next(new ApiError("Invalid user ID passed", 400));
    }
    if (!await User.findByPk(therapistId)) {
      return next(new ApiError("User not found", 404));
    }
    const reviews = await Review.findAndCountAll({
      where: {
        clientId: req.user.id,
        therapistId: therapistId
      },
      attributes: ['id', 'content', 'rating'],
      limit: pageSize,
      offset
    });

    return res.status(200).json({
      success: true,
      message: reviews.count === 0 ? 'No reviews found for this therapist' : 'Reviews found',
      data: {
        rows: reviews.rows,
        currentPage: page
      } 
    })
  },
);
