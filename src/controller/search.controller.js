const { Op } = require('sequelize')
const {
  specialisations: Specialisation
} = require('../models')

const { ApiError } = require('../utils/errors')
const { catchAsyncErrors } = require('../routes/middlewares/errors')

module.exports.searchTherapist = catchAsyncErrors(async (req, res, next) => {
  let { category, page = 1, pageSize = 10, name } = req.query

  if (category.length === 0) {
    next(new ApiError('Select at least one category', 400))
  }
  if (typeof page !== 'number') page = 1
  if (typeof pageSize !== 'number') pageSize = 10
  const offset = (page - 1) * pageSize
  const matched = await Specialisation.findAndCountAll({
    // cache this query
    where: {
      categoryId: category,
      ratePerHour: {
        [Op.not]: null
      },
      isEmailVerified: true,
      availability: {
        [Op.ne]: '[]'
      }
    },
    includes: {
      model: 'therapists'
    },
    limit: pageSize,
    offset
  })

  const response = {
    status: true,
    message: matched.count === 0 ? 'No matching therapist' : 'Therapists matched' ,
    therapists: matched.rows,
    currentPage: page
  }
  res.status(200).json(response)
})
