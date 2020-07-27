'use strict';
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const logger = require('../utils/logger');
const memberStore = require('../models/trainer-store');

const member = {

    index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      name: 'Dashboard',
      member: memberStore.getUserMember(loggedInUser.id),
    };
    logger.info('about to render', memberStore.getAllMembers());
    response.render('dashboard', viewData);
    },
  
    deleteStat(request, response) {
    const memberId = request.params.id;
    const statId = request.params.statsId;
    logger.debug(`Deleting Stat ${statId} from Member ${memberId}`);
    memberStore.removeStat(memberId, statId);
    response.redirect('/member/' + memberId);
  },
  
    addStat(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    const newStat = {
      id: uuid.v1(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    memberStore.addStat(memberId, newStat);
    response.redirect('/member/' + memberId);
  },
};

module.exports = member;