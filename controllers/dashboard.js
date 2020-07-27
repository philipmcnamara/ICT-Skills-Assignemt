"use strict";

const uuid = require('uuid');
const logger = require("../utils/logger");
const memberStore = require('../models/member-store');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      name: 'Member Dashboard',
      member: memberStore.getAllMembers(),
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
    const newMember = {
      id: uuid.v1(),
      name: request.body.name,
      stats: [],
    };
    memberStore.addMember(newMember);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;