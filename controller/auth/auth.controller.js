const ApiError = require("../../utils/errors");
const db = require('../../models');
const { generatePasswordHash } = require("../../utils");

module.exports.registerTherapist = async function (req, res, next) {
    const {email, full_name, password} = req.body
    if (!email || !full_name || !password) {
        throw new ApiError('Invalid request body', 400);
    }
    await db.therapists.create({
        email, name: full_name, password: await generatePasswordHash(password)
    });

    res.status(201)
    .json({
        success: true,
        message: 'User registered'
    })
}

module.exports.loginTherapist = function (req, res, next) {
    
}

module.exports.registerClient = function (req, res, next) {
    
}

module.exports.loginClient = function (req, res, next) {
    
}