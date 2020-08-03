'use strict';
const uuid = require('uuid');

const logger = require('../utils/logger');
const trainerStore = require('../models/trainer-store');

const member = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug('Member id = ', memberId);
    const viewData = {
      name: 'Member',
      member: trainerStore.getMember(memberId),
    };
    response.render('member', viewData);
  },
    deleteStat(request, response) {
    const memberId = request.params.id;
    const statId = request.params.statsId;
    logger.debug(`Deleting Stat ${statId} from Member ${memberId}`);
    trainerStore.removeStat(memberId, statId);
    response.redirect('/member/' + memberId);
  },
    addStat(request, response) {
    const memberId = request.params.id;
    const member = trainerStore.getMember(memberId);
    const newStat = {
      id: uuid.v1(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    trainerStore.addStat(memberId, newStat);
    response.redirect('/member/' + memberId);
  },
};

module.exports = member;