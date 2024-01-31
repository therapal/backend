const ApiError = require("../utils/errors");
const {
    user: User, 
    therapist: Therapist,
    admin: Admin
} = require('../models');
const { generatePasswordHash } = require("../utils");

module.exports.register = async function (req, res, next) {
    const {email, firstName, lastName, password, role} = req.body;
    if (!email || !firstName || !lastName || !password) {
        return next(new ApiError('Invalid request body', 400));
    };
    if (!['therapist', 'client', 'admin'].includes(role)) {
        return next(new ApiError('Invalid role', 400));
    };
    const hashedPassword = await generatePasswordHash(password);
    const user = await User.create({
        email, firstName, lastName, password: hashedPassword, role
    });
    switch (role) {
        case 'therapist':
            await Therapist.create({userId: user.id});
        return
        case 'client':
            await Client.create({userId: user.id});
            return
        case 'admin':
            await Admin.create({userId: user.id});
    }
    res.status(201)
    .json({
        success: true,
        message: 'User registered',

    })
}

module.exports.login = function (req, res, next) {
    
}
