const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    let result = {}
    if (req.session.user && !req.session.user.provider) {
      result.providers = await User.findAll({ where: { provider: true } })
    } else {
      result.appointments = await Appointment.findAll({
        where: {
          provider_id: req.session.user.id,
          date: {
            [Op.between]: [
              moment()
                .startOf('day')
                .format(),
              moment()
                .endOf('day')
                .format()
            ]
          }
        },
        include: [{ model: User, as: 'user' }]
      })
    }
    return res.render('dashboard', { result })
  }
}

module.exports = new DashboardController()
