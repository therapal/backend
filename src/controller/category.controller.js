const {
  categories: Category,
  specialisations: Specialisation,
  users: User,
} = require("../models");
const { catchAsyncErrors } = require("../routes/middlewares/errors");

const { ApiError } = require("../utils/errors");

module.exports.getAllCategory = catchAsyncErrors(async (req, res, next) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const all = await Category.findAndCountAll({
    limit: pageSize,
    offset,
    attributes: ["id", "title", "description"],
  });
  return res.status(200).json({
    success: true,
    message: "Therapy categories found",
    data: {
      rows: all.rows,
      currentPage: page,
    },
  });
});

module.exports.getAllUsersInCategory = catchAsyncErrors(
  async (req, res, next) => {
    const matched = await Specialisation.findAndCountAll({
      where: {
        categoryId: req.params.id,
      },
      attributes: ["userId"],
      include: {
        model: User,
        attributes: ["id", "fullName", "imgPath"],
      },
    });
    matched.rows = matched.rows.map((i) => {
      i = i.user;
      return i;
    });
    return res.status(200).json({
      success: true,
      message: matched.count === 0 ? "No users found" : "Users found",
      data: {
        rows: matched.rows,
      },
    });
  },
);
module.exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return next(new ApiError("Please choose a title and description", 404));
  }
  const category = await Category.create({
    title,
    description,
  });

  res.status(201).json({
    success: true,
    message: "Category created",
    data: {
      id: category.id,
      title: category.title,
      description: category.description,
    },
  });
});
