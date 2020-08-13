'use strict';
const uuid = require('uuid');

const logger = require('../utils/logger');
const trainerStore = require('../models/trainer-store');

const trainer = {
  index(request, response) {
    const trainerId = request.params.id;
    logger.debug('trainer id = ', trainerId);
    const viewData = {
      name: 'trainer',
      member: trainerStore.getMember(trainerId),
    };
    response.render('trainer', viewData);
  },
  
  
};

module.exports = trainer;