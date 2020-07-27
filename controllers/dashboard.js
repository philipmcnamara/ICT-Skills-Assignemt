"use strict";

const accounts = require ('./accounts.js');
const uuid = require('uuid');
const logger = require("../utils/logger");
const memberStore = require('../models/trainer-store');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      name: 'Member Dashboard',
      member: memberStore.getTrainerMembers(loggedInMember.id),
    };
    logger.info('about to render', memberStore.getAllMembers());
    response.render('dashboard', viewData);
  },
  
    deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member( ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect('/dashboard');
  },
    addMember(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const newMember = {
      id: uuid.v1(),
      memberid: loggedInMember.id,
      name: request.body.name,
      stats: [],
    };
    logger.debug('Creating a new Member', newMember);
    memberStore.addMember(newMember);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;

