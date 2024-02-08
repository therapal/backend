const express = require('express')
const router = express.Router()

const { createTherapistReview } = require('../../controller/review.controller')

router.route('/').post(createTherapistReview)

module.exports = router
