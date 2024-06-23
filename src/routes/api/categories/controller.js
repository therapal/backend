const { Categories, TherapistCategories } = require("@models/index.js");
const { catchAsyncErrors, ApiError } = require("@utils/errors.js");

module.exports.getAllCategory = catchAsyncErrors(async (req, res, next) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const all = await Categories.findAndCountAll({
    limit: pageSize,
    offset,
    attributes: ["id", "title", "description"],
  });
  return res.status(200).json({
    success: true,
    message: "Therapy categories found",
    data: {
      rows: all.rows,
      pageSize,
      page,
    },
  });
});

module.exports.getAllTherapistsInCategory = async (req, res, next) => {
  const matched = await TherapistCategories.findAndCountAll({
    where: {
      category_id: req.params.id,
    },
    attributes: ["therapist_id"],
    include: {
      model: Therapists,
      attributes: ["id", "ful_name", "profile_picture"],
    },
  });
  return res.status(200).json({
    success: true,
    message: matched.count === 0 ? "No therapist found" : "Data retrieved",
    data: matched.rows,
  });
};
module.exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return next(new ApiError("Please choose a title and description", 404));
  }
  const category = await Categories.create({
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
