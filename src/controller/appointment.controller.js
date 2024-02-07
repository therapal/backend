const {
  appointments: Appointment,
  transactions: Transaction,
  clients: Client,
  therapists: Therapist
} = require('../models')
const { catchAsyncErrors } = require('../routes/middlewares/errors')
const { ApiError } = require('../utils/errors')
const crypto = require('crypto')
const { paystackConfig } = require('../config')
const { default: axios } = require('axios')
const { Op } = require('sequelize')

module.exports.createAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    date, // 2020-02-12
    time, // 10:00 AM,
    hoursCount,
    therapistId
  } = req.body
  if (!date || !time || !therapistId || !hoursCount) {
    return next(new ApiError('Invalid request body', 400))
  }
  const therapist = await Therapist.findOne({
    where: { id: therapistId },
    attributes: ['email', 'ratePerHour']
  })
  if (!therapist) {
    return next(new ApiError('Therapist ID does not exist', 400))
  }
  if (typeof parseInt(hoursCount) !== 'number') {
    return next(new ApiError('Invalid hours passed', 400))
  }
  const existingAppointments = await Appointment.findAndCountAll({
    where: {
      therapistId,
      status: {
        [Op.or]: ['fixed', 'active']
      }
    }
  })
  const formattedTime = formatTo24Hour(time)
  const utcTimestamp = new Date(`${date} ${formattedTime}`)

  for (let index = 0; index < existingAppointments.rows.length; index += 1) {
    const i = existingAppointments.rows[index]
    const date = new Date(i.timestamp)
    if (
      date.toLocaleDateString() === utcTimestamp.toLocaleDateString() &&
      date.toLocaleTimeString() === utcTimestamp.toLocaleTimeString()
    ) {
      return next(new ApiError('This date is not available', 400))
    }
  }

  const appointment = await Appointment.create({
    therapistId,
    clientId: req.user.id,
    timestamp: utcTimestamp,
    status: 'pending',
    durationMinutes: parseInt(hoursCount * 60),
    appointmentFormat: 'chat'
  })
  const trxRef = crypto.randomUUID()
  await Transaction.create({
    appointmentId: appointment.id,
    reference: trxRef
  })
  const client = await Client.findOne({
    where: { id: req.user.id },
    attributes: ['email']
  })
  const trxAmount = therapist.ratePerHour * hoursCount
  return res.status(201).json({
    success: true,
    message: 'Appointment created. Proceed with payment',
    data: {
      clientEmail: client.email,
      amount: trxAmount,
      publicKey: paystackConfig.pubKey,
      transactionRef: trxRef
    }
  })
})

module.exports.verifyAppointment = catchAsyncErrors(async (req, res, next) => {
  const { trxRef } = req.params
  const transaction = await Transaction.findOne({
    where: { reference: trxRef },
    attributes: ['appointmentId']
  })
  if (!transaction) {
    return next(new ApiError('No transaction found', 404))
  }
  await axios
    .get(`https://api.paystack.co/transaction/verify/${trxRef}`, {
      headers: { Authorization: `Bearer ${paystackConfig.privKey}` }
    })
    .then(async (axiosReponse) => {
      const paystackResponse = axiosReponse.data
      if (!paystackResponse.status) {
        return next(new ApiError('Could not verify transaction', 500))
      }
      if (paystackResponse.data.status === 'success') {
        transaction.status = 'success'
        await transaction.save()
        const appointment = await Appointment.update(
          { status: 'fixed' },
          {
            where: { id: transaction.appointmentId },
            includes: ['therapistId']
          }
        )
        const date = new Date(appointment.timestamp)
        res.status(200).json({
          success: true,
          message: `Transaction successful. Appointment is scheduled on ${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`,
          data: {
            durationMinutes: appointment.durationMinutes,
            therapist: {
              fullName: appointment.therapistId.fullName,
              imgPath: appointment.therapistId.imgPath
            }
          }
        })
      } else {
        return res.status(200).json({
          success: true,
          message: 'Transaction not yet complete'
        })
      }
    })
})

function formatTo24Hour (timeString) {
  const match = timeString.match(/(\d+):(\d+) (\w+)/)
  const hour = parseInt(match[1])
  const minute = match[2]
  const period = match[3]
  let formattedHour = hour

  if (period === 'PM' && hour < 12) {
    formattedHour += 12
  }

  return `${formattedHour}:${minute}`
}
