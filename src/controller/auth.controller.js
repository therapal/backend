const { ApiError } = require('../utils/errors')
const { users: User, tokens: Token } = require('../models')
const { jwtSecret, NODE_ENV, clientDomain } = require('../config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { catchAsyncErrors } = require('../routes/middlewares/errors')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const shado = require('shado')
const { passwordStrength } = require('check-password-strength')

module.exports.register = catchAsyncErrors(async function (req, res, next) {
  const { email, fullName, password, role } = req.body
  if (!email || !fullName || !password) {
    return next(new ApiError('Invalid request body', 400))
  }
  if (!['therapist', 'client', 'admin'].includes(role)) {
    return next(new ApiError('Invalid role', 400))
  }
  if (await User.findOne({ where: { email } })) {
    return next(new ApiError('Email already exists', 409))
  }
  if (passwordStrength(password).value !== 'Strong') {
    return next(
      new ApiError(
        'Password should contain at least one Uppercase letter, alpha numeric character, a digit and should be at least 8 characters long',
        400
      )
    )
  }
  const hashedPassword = await generatePasswordHash(password)
  const user = await User.create({
    email,
    fullName,
    role,
    password: hashedPassword
  })

  await sendEmailVerificationLink({
    id: user.id,
    fullName: user.fullName,
    email: user.email
  })
  return res.status(201).json({
    success: true,
    message: 'User registered',
    data: {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    }
  })
})

module.exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
  const { uId } = req.body
  const mailToken = await Token.findOne({ where: { token: uId } })
  if (!mailToken) {
    return next(new ApiError('Invalid verification link', 400))
  }
  const minsDuration = shado.date
    .set(new Date(mailToken.createdAt), new Date())
    .getMinutes()
  if (minsDuration > 1440 /* 1 day */) {
    return next(new ApiError('Invalid verification link', 400))
  }
  await User.update(
    { isEmailVerified: true },
    { where: { id: mailToken.userId } }
  )
  await mailToken.destroy()

  return res.status(200).json({
    success: true,
    message: 'Email is now verified'
  })
})

module.exports.sendEmailVerification = catchAsyncErrors(
  async function (req, res, next) {
    const { email } = req.query
    const user = await User.findOne({
      where: { email },
      attributes: ['email', 'fullName', 'id', 'isEmailVerified']
    })
    if (!user) {
      return next(new ApiError('Invalid email passed', 400))
    }
    if (user.isEmailVerified) {
      return next(new ApiError('Email is already verified', 401))
    }
    const token = await Token.findOne(
      {
        where: {
          userId: user.id,
          type: 'verify_email'
        }
      },
      {
        order: [['createdAt', 'desc']],
        limit: 1
      }
    )
    if (token) {
      const minsDuration = shado.date
        .set(new Date(token.createdAt), new Date())
        .getMinutes()

      if (minsDuration < 10) {
        return next(
          new ApiError(
            `You can't request an email verification link at this time. Wait for the next ${10 - minsDuration} minutes`,
            401
          )
        )
      }
    }

    await sendEmailVerificationLink({
      fullName: user.fullName,
      email: user.email,
      id: user.id
    })
    return res.status(200).json({
      success: true,
      message: 'Email verification link sent'
    })
  }
)
module.exports.sendResetPasswordLink = catchAsyncErrors(
  async function (req, res, next) {
    const { email } = req.query
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return next(new ApiError('Could not send link', 400))
    }
    const token = await Token.findOne(
      {
        where: {
          userId: user.id,
          type: 'reset_password'
        }
      },
      {
        order: [['createdAt', 'desc']],
        limit: 1
      }
    )
    if (token) {
      const minsDuration = shado.date
        .set(new Date(token.createdAt), new Date())
        .getMinutes()

      if (minsDuration < 10) {
        return next(
          new ApiError(
            `You can't request a password reset link at this time. Wait for the next ${10 - minsDuration} minutes`,
            401
          )
        )
      }
    }
    await sendResetPasswordLinkToEmail({
      id: user.id,
      email: user.email,
      fullName: user.fullName
    })
    return res.status(200).json({
      success: true,
      message: 'Password reset link sent'
    })
  }
)
module.exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.user
  const user = await User.findOne({
    where: { id },
    attributes: ['password']
  })
  const { oldPassword } = req.body
  const compareOld = bcrypt.compareSync(oldPassword, user.password)
  if (!compareOld) {
    return next(new ApiError('Old password is invalid', 401))
  }
  req.resetPassword = { existingPassword: user.password }
  return initializeUpdate(req, res, next)
})
module.exports.resetPassword = catchAsyncErrors(
  async function (req, res, next) {
    const { uId } = req.body
    const mailToken = await Token.findOne({
      where: { token: uId, type: 'reset_password' }
    })
    if (!mailToken) {
      return next(new ApiError('Invalid link', 400))
    }
    const user = await User.findOne({
      where: { id: mailToken.userId },
      attributes: ['password', 'id']
    })
    req.user = { id: user.id }
    req.resetPassword = { existingPassword: user.password }
    return initializeUpdate(req, res, next)
  }
)
module.exports.logout = catchAsyncErrors(async function (req, res, next) {
  res.clearCookie('token')
  res.sendStatus(200)
})
module.exports.login = catchAsyncErrors(async function (req, res, next) {
  const { email, password } = req.body
  const user = await User.findOne({
    where: { email },
    attributes: [
      'password',
      'isEmailVerified',
      'id',
      'role',
      'fullName',
      'email'
    ]
  })
  if (!user) {
    return next(new ApiError('Incorrect credentials', 401))
  }
  const compare = bcrypt.compareSync(password, user.password)
  if (!compare) {
    return next(new ApiError('Incorrect credentials', 401))
  }
  if (!user.isEmailVerified) {
    return next(new ApiError('Account is not yet verified', 401))
  }
  const token = await createJwtToken({
    id: user.id,
    role: user.role,
    isEmailVerified: user.isEmailVerified
  })
  res.cookie('token', token, {
    signed: true,
    path: '/',
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: NODE_ENV !== 'development'
  })
  return res.status(200).json({
    success: true,
    message: 'You are now logged in',
    data: {
      user: {
        id: user.id,
        fullName: user.fullName,
        role: user.role,
        email: user.email
      }
    }
  })
})

async function createJwtToken (user) {
  const maxAge = '30 mins'
  return await jwt.sign(
    {
      id: user.id,
      role: user.role,
      isEmailVerified: user.isEmailVerified
    },
    jwtSecret,
    { expiresIn: maxAge }
  )
}

async function generatePasswordHash (password) {
  const saltRound = 10
  return await bcrypt.hash(password, saltRound)
}

async function initializeUpdate (req, res, next) {
  const { newPassword, confirmPassword } = req.body
  const { id } = req.user
  const existingPassword = req.resetPassword.existingPassword
  if (newPassword !== confirmPassword) {
    return next(
      new ApiError('New password does not match confirmation password', 400)
    )
  }
  const isExistingPassword = bcrypt.compareSync(newPassword, existingPassword)
  if (isExistingPassword) {
    return next(
      new ApiError(
        'Your attempt to change the password to the same one as before has been unsuccessful. Please choose a new and unique password for your account',
        400
      )
    )
  }
  if (passwordStrength(newPassword).value !== 'Strong') {
    return next(
      new ApiError(
        'Password should contain at least one Uppercase letter, alpha numeric character, a digit and should be at least 8 characters long',
        400
      )
    )
  }

  const hashedPassword = await generatePasswordHash(newPassword)
  await User.update({ password: hashedPassword }, { where: { id } })

  return res.status(200).json({
    success: true,
    message: 'Password reset successful'
  })
}

async function sendEmailVerificationLink ({ id, fullName, email }) {
  const mailToken = await Token.create({
    token: crypto.randomUUID(),
    userId: id,
    type: 'verify_email'
  })
  await sendEmail({
    email,
    subject: 'Email verification',
    html: `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body {
              font-family: system-ui, 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }

            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            h2 {
              color: #333;
            }

            p {
              color: #555;
            }

            .verification-link {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              background-color: #007BFF;
              color: #fff;
              text-decoration: none;
              border-radius: 3px;
            }

            .footer {
              margin-top: 20px;
              text-align: center;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Email Verification</h2>
            <p>Hello ${fullName},</p>
            <p>Thank you for signing up. To complete the registration process, please click the verification link below:</p>
            <a class="verification-link" href="${clientDomain}/verify-email?uId=${mailToken.token}">Verify Email</a>
            <p>If you didn't sign up for our service, you can safely ignore this email.</p>
            <div class="footer">
              <p>Regards,<br>Therapal</p>
            </div>
          </div>
        </body>
      </html>
    `
  })
}
async function sendResetPasswordLinkToEmail ({ id, fullName, email }) {
  const mailToken = await Token.create({
    token: crypto.randomUUID(),
    userId: id,
    type: 'reset_password'
  })
  await sendEmail({
    email,
    subject: 'Reset password',
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body {
              font-family: system-ui, Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h1 {
              color: #333;
            }
            p {
              color: #666;
            }
            .btn {
              display: inline-block;
              padding: 10px 20px;
              margin: 10px 0;
              text-decoration: none;
              background-color: #3498db;
              color: #fff;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Password Reset</h1>
            <p>Hello ${fullName},</p>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <a href="${clientDomain}/reset-password?uId=${mailToken.token}" class="btn">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
            <p>Thanks,<br>Therapal</p>
          </div>
        </body>
      </html>
    
    `
  })
}
