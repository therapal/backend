const express = require('express')
const router = express.Router()
const { updatePreference } = require('../../controller/preference.controller')

router.route('/').put(updatePreference)

module.exports = router
