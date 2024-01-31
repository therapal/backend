var router = require('express').Router();

const authRoute = require('./auth.route');
const clientRoute = require('./client.route');
const therapistRoute = require('./therapist.route');
const adminRoute = require('./admin.route');
const appointmentRoute = require('./appointment.route');

router.use('/auth', authRoute);
router.use('/client', clientRoute);
router.use('/therapist', therapistRoute);
router.use('/admin', adminRoute);
router.use('/appointment', appointmentRoute);

module.exports = router;