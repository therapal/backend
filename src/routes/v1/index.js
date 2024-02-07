const router = require('express').Router()

const authRoute = require('./auth.route')
const adminRoute = require('./admin.route')
const appointmentRoute = require('./appointment.route')
const profileRoute = require('./profile.route')
const searchRoute = require('./search.route')
const specialisationRoute = require('./specialisation.route')
const preferenceRoute = require('./preference.route')
const reviewRoute = require('./review.route')

router.use('/auth', authRoute)
router.use('/admin', adminRoute)
router.use('/appointment', appointmentRoute)
router.use('/profile', profileRoute)
router.use('/search', searchRoute)
router.use('/specialisation', specialisationRoute)
router.use('/preference', preferenceRoute)
router.use('/review', reviewRoute)

module.exports = router
