const {
  specialisations: Specialisation,
  categories: Category
} = require('../models')
const { catchAsyncErrors } = require('../routes/middlewares/errors')

const { ApiError } = require('../utils/errors')

module.exports.addSpecialisation = catchAsyncErrors(async (req, res, next) => {
  const { categoryId } = req.body
  if (!categoryId || !(await Category.findByPk(categoryId))) {
    return next(new ApiError('Category does not exist', 404))
  }
  if (
    await Specialisation.findOne({ where: { categoryId, userId: req.user.id } })
  ) {
    return next(
      new ApiError('Specialisation already added for this user', 400)
    )
  }
  await Specialisation.create({
    therapistId: req.user.id,
    categoryId
  })
  res.status(200).json({
    success: true,
    message: 'Specialisation updated'
  })
})
