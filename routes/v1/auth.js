var express = require('express');
const {catchAsyncErrors} = require('../middlewares/errors');
var router = express.Router();
const {
    registerTherapist,
    registerClient,
    loginTherapist,
    loginClient
} = require('../../controller/auth/auth.controller')

router.post('/register/therapist', catchAsyncErrors(registerTherapist))
router.post('/login/therapist', catchAsyncErrors(loginTherapist))

router.post('/register/client', catchAsyncErrors(registerClient))
router.post('/login/client', catchAsyncErrors(loginClient))


module.exports = router;