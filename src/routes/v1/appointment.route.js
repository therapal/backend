const express = require('express')
const router = express.Router()
const {
  createAppointment,
  verifyAppointment
} = require('../../controller/appointment.controller.js')
const { authenticateUser, validateRole } = require('../middlewares/auth')

router
  .route('/')
  .post(authenticateUser, validateRole('client'), createAppointment)
router
  .route('/verify/:trxRef')
  .post(authenticateUser, validateRole('client'), verifyAppointment)
module.exports = router
