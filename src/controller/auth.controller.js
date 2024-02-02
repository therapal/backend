const ApiError = require("../utils/errors");
const {
	client: Client, 
	therapist: Therapist,
	admin: Admin
} = require('../models');
const {jwtSecret, NODE_ENV} = require('../config');
const bcrypt = require('bcrypt');

module.exports.register = async function (req, res, next) {
	const {email, name, password, role} = req.body;
	if (!email || !name || !password) {
		return next(new ApiError('Invalid request body', 400));
	};
	if (!['therapist', 'client', 'admin'].includes(role)) {
		return next(new ApiError('Invalid role', 400));
	};
	const hashedPassword = await generatePasswordHash(password);
	const user = {
		email,
		firstName: name.trim().split(' ')[0],
		lastName: name.trim().split(' ')[1],
		isVerified: false,
		password: hashedPassword
	}
	
	switch (role) {
		case 'therapist':
			await Therapist.create(user);
		return
		case 'client':
			await Client.create(user);
			return
		case 'admin':
			await Admin.create(user);
	}
	res.status(201).json({
		success: true,
		message: 'User registered',

	})
}

module.exports.login = async function (req, res, next) {
	const {
		email,
		password,
		role
	} = req.body;
	let user;
	switch (role) {
		case 'therapist':
			user = await Therapist.findOne({
				where: {email: email},
				attributes: ['password']
			});
			user.role = 'therapist'
			return
		case 'client':
			user = await Client.findOne({
				where: {email: email},
				attributes: ['password']
			})
			user.role = 'client'
			return
		default:
			if (!user) {
				return next(new ApiError('Incorrect credentials'));
			};
			next()
	};
	const compare = bcrypt.compareSync(password, user.password);
	if (!compare) {
		return next(new ApiError('Incorrect credentials'));
	};
	
	const token = await createJwtToken({
		id: user.id,
		role: user.role,
	});
	res.cookie('token', token, {
		signed: true,
		path: '/',
		expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
		httpOnly: true,
		secure: NODE_ENV === 'development' ? false : true
	});
	res.status(200).json({
		success: true,
		message: 'You are logged in'
	})
};

async function createJwtToken(user) {
	const maxAge = '30 mins'
	return await jwt.sign({
		id: user.id,
		role: user.role
	}, jwtSecret, {expiresIn: maxAge})
};

async function generatePasswordHash(password) {
	const salt_round = 10;
	return await bcrypt.hash(password, salt_round);
};

