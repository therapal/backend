const {
  specialisations: Specialisation,
  categories: Category,
  users: User,
} = require("../models");
const { catchAsyncErrors } = require("../routes/middlewares/errors");

const { ApiError } = require("../utils/errors");

module.exports.getUserSpecialisations = catchAsyncErrors(
  async (req, res, next) => {
    const { userId, page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    if (!(await User.findByPk(userId))) {
      return next(new ApiError("User does not exist", 404));
    }

    const matched = await Specialisation.findAndCountAll({
      where: { userId },
      attributes: ["categoryId"],
      include: {
        model: Category,
        attributes: ["id", "title", "description"],
      },
      limit: pageSize,
      offset,
    });
    matched.rows = matched.rows.map((i) => {
      i = i.category;
      return i;
    });

    return res.status(200).json({
      success: true,
      message:
        matched.count === 0
          ? "No specialisations found"
          : "Specialisations found",
      data: {
        rows: matched.rows,
        currentPage: page,
      },
    });
  },
);

module.exports.addSpecialisation = catchAsyncErrors(async (req, res, next) => {
  const { categoryId } = req.body;
  if (!categoryId || !(await Category.findByPk(categoryId))) {
    return next(new ApiError("Category does not exist", 404));
  }
  if (
    await Specialisation.findOne({ where: { categoryId, userId: req.user.id } })
  ) {
    return next(
      new ApiError("User already belongs to this specialisation", 400),
    );
  }
  await Specialisation.create({
    userId: req.user.id,
    categoryId,
  });
  res.status(200).json({
    success: true,
    message: "Specialisation updated",
  });
});
