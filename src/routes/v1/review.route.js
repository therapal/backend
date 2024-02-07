const express = require('express')
const router = express.Router()

const { authenticateUser } = require('../middlewares/auth')
const { createTherapistReview } = require('../../controller/review.controller')

router
  .route('/')
  .post( createTherapistReview)

module.exports = router
