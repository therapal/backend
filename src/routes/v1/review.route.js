const express = require('express')
const router = express.Router()

const { authenticateUser, validateRole } = require('../middlewares/auth')
const { createTherapistReview } = require('../../controller/review.controller')

router
  .route('/')
  .post(authenticateUser, validateRole('client'), createTherapistReview)

module.exports = router
