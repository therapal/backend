const express = require('express')
const router = express.Router()

const { authenticateUser, validateRole } = require('../middlewares/auth')
const {
  addSpecialisation
} = require('../../controller/specialisation.controller')

router
  .route('/')
  .put(authenticateUser, validateRole('therapist'), addSpecialisation)

module.exports = router
