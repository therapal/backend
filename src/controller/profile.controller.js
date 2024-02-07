const { profiles: Profile } = require('../models')
const { catchAsyncErrors } = require('../routes/middlewares/errors')

const { ApiError } = require('../utils/errors')

module.exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const fields = Object.keys(req.body)

  let profile = await Profile.findOne({ where: { userId: req.user.id } })
  if (!profile) {
    profile = await Profile.create({ userId: req.user.id })
  }

  if (fields.includes('availability')) {
    if (!validateAvailability(req.body.availability)) {
      return next(new ApiError('Invalid availability passed', 400))
    }
    profile.availability = req.body.availability
  }

  if (fields.includes('gender')) {
    if (!['male', 'female', 'neutral'].includes(req.body.gender)) {
      return next(new ApiError('Invalid gender value passed ', 400))
    }
    profile.gender = req.body.gender
  }
  if (fields.includes('ratePerHour')) {
    if (typeof req.body.ratePerHour !== 'number') {
      return next(new ApiError('Invalid rate passed', 400))
    }
    profile.ratePerHour = req.body.ratePerHour
  }
  await profile.save()
  res.status(200).json({
    success: true,
    message: 'Profile updated',
    data: {
      profile: req.body
    }
  })
})

function validateAvailability (availability) {
  const days = ['mon', 'tues', 'wed', 'thu', 'fri', 'sat', 'sun']
  const times = ['morning', 'midDay', 'evening']
  if (
    !Object.prototype.toString.call(availability) === '[Object Object]' ||
    !Array.isArray(availability.days) ||
    !Array.isArray(availability.times)
  ) {
    return false
  }

  for (let i = 0; i < availability.times.length; i += 1) {
    if (!times.includes(availability.times[0])) {
      return false
    }
  }
  for (let i = 0; i < availability.days.length; i += 1) {
    if (!days.includes(availability.days[0])) {
      return false
    }
  }

  return true
}
