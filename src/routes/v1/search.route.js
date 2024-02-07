const express = require('express')
const router = express.Router()
const { searchTherapist } = require('../../controller/search.controller')
const { authenticateUser, validateRole } = require('../middlewares/auth')

router
  .route('/')
  .get(authenticateUser, validateRole('client'), searchTherapist)

module.exports = router
