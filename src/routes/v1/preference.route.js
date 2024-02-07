const express = require('express')
const router = express.Router()
const { updatePreference, updatePreferredLanguage, deletePreferredLanguage } = require('../../controller/preference.controller')

const { authenticateUser, validateRole } = require('../middlewares/auth')

router
  .route('/')
  .post(authenticateUser, validateRole('client'), updatePreference);

module.exports = router
