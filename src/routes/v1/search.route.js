const express = require('express')
const router = express.Router()
const { searchTherapist } = require('../../controller/search.controller')

router.route('/').get(searchTherapist)

module.exports = router
