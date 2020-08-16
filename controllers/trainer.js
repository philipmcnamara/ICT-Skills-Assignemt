'use strict';
const uuid = require('uuid');

const logger = require('../utils/logger');
const trainerStore = require('../models/trainer-store');
const userStore = require('../models/member-store');

const trainer = {
  index(request, response) {
    const memberId = request.params.id;
    
    logger.info(`MemberId test: ( ${memberId}`);
    logger.info('Member id = ', memberId);
    const viewData = {
      name: 'Member',
      member: userStore.getUser(memberId),
    };
    response.render('trainermember', viewData);
  },
  
  addComment  (request, responce)
  {
    const memberId = request.params.id;
    const member = userStore.getUser(memberId);

    const newStat = {
    comment: request.body.commment
    }
    userStore.addStat(memberId, newStat);
  }
  
};

module.exports = trainer;