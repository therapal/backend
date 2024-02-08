const express = require('express')
const router = express.Router()
const {
  register,
  login,
  sendEmailVerification,
  verifyEmail,
  sendResetPasswordLink,
  resetPassword,
  updatePassword,
  logout
} = require('../../controller/auth.controller')
const { authenticateUser } = require('../middlewares/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.route('/email/verify').put(verifyEmail).get(sendEmailVerification)

router.route('/password/reset').get(sendResetPasswordLink).put(resetPassword)
router.route('/password/update').put(authenticateUser, updatePassword)

module.exports = router
