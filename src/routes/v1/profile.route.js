const express = require('express')
const router = express.Router()

const { updateProfile } = require('../../controller/profile.controller')

router.route('/').put(updateProfile)

module.exports = router
