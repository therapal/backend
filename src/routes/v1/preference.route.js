const express = require('express')
const router = express.Router()
const { updatePreference, updatePreferredLanguage, deletePreferredLanguage } = require('../../controller/preference.controller')

const { authenticateUser } = require('../middlewares/auth')

router
  .route('/')
  .put(updatePreference);

module.exports = router
