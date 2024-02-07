const { preferences: Preference, languages: Language, preferredLanguages: PreferredLanguage } = require('../models')

const { ApiError } = require('../utils/errors')
const { catchAsyncErrors } = require('../routes/middlewares/errors')

module.exports.updatePreference = catchAsyncErrors(async (req, res, next) => {
  
})
