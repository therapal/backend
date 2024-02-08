const { categories: Category } = require('../models')
const { catchAsyncErrors } = require('../routes/middlewares/errors')

const { ApiError } = require('../utils/errors')

module.exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body
  if (!title || !description) {
    return next(new ApiError('Please choose a title and description', 404))
  }
  const category = await Category.create({
    title,
    description
  })

  res.status(200).json({
    success: true,
    message: 'Category created',
    data: {
      id: category.id,
      title: category.title,
      description: category.description
    }
  })
})
