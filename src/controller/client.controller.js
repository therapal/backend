const {
  specialisations: Specialisation,
  notification: Notification,
  therapist: Therapist,
  appointment: Appointment
} = require('../models');

const {
  ApiError
} = require('../utils/errors');

module.exports.searchTherapist = async (req, res, next) => {
  let {
    categories,
    page = 1,
    pageSize = 10
  } = req.query;
  
  if (categories.length === 0) {
    next(new ApiError("Select at least one category", 400))
  };
  if (typeof page !== 'number') page = 1;
  if (typeof pageSize !== 'number') pageSize = 10;
  const offset = (page - 1) * pageSize;
  const matched = await Specialisation.findAndCountAll({ // cache this query
    where: {
      categoryId: {
        [Op.or]: categories
      }
    },
    includes: {
      model: 'therapists',
      include: {
        model: 'users'
      }
    },
    order: [[sortBy, sortBy]],
    limit: pageSize,
    offset
  });
  let responseMsg;
  if (matched.count === 0) responseMsg = 'No matching therapist'
  else responseMsg = 'Therapists matched'

  const response = {
    status: true,
    message: responseMsg,
    therapists: matched.rows,
    currentPage: page
  }
  res.status(200).json({response})
}

