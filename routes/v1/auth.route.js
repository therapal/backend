var express = require('express');
const {catchAsyncErrors} = require('../middlewares/errors');
var router = express.Router();
const {
    register,
    login,
} = require('../../controller/auth.controller');

router.post('/register', catchAsyncErrors(register));
router.post('/login', catchAsyncErrors(login));

module.exports = router;