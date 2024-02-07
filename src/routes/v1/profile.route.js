const express = require('express')
const router = express.Router()

const { authenticateUser, validateRole } = require('../middlewares/auth')
const {
  updateProfile
} = require('../../controller/profile.controller')

router
  .route('/')
  .put(authenticateUser, validateRole('therapist'), updateProfile)

module.exports = router
