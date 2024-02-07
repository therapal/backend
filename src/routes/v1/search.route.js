const express = require('express')
const router = express.Router()
const { searchTherapist } = require('../../controller/search.controller')
const { authenticateUser } = require('../middlewares/auth')

router
  .route('/')
  .get( searchTherapist)

module.exports = router
