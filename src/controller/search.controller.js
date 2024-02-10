const { specialisations: Specialisation, users: User } = require("../models");
const {Op} = require('sequelize')

const { ApiError } = require("../utils/errors");
const { catchAsyncErrors } = require("../routes/middlewares/errors");

module.exports.searchTherapist = catchAsyncErrors(async (req, res, next) => {
  let { category, page = 1, pageSize = 10, fullName } = req.query;
  
  if (category.length === 0) {
    next(new ApiError("Select at least one category", 400));
  }
  if (typeof page !== "number") page = 1;
  if (typeof pageSize !== "number") pageSize = 10;
  if (!fullName) fullName = ''
    
  const offset = (page - 1) * pageSize;
  const matched = await Specialisation.findAndCountAll({
    // cache this query
    where: {
      categoryId: category,
    },
    include: {
      model: User,
      attributes: ["id", "fullName", "imgPath"],
      where: {
        fullName: {
          [Op.like]: `%${fullName}%`
        }
      }
    },
    limit: pageSize,
    offset,
  });
  matched.rows = matched.rows.map((i) => {
    i = i.user;
    return i;
  });

  const response = {
    status: true,
    message:
      matched.count === 0 ? "No matching therapist" : "Therapists matched",
    data: matched.rows,
    currentPage: page,
  };
  res.status(200).json(response);
});
