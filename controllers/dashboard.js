"use strict";

const uuid = require('uuid');
const logger = require("../utils/logger");
const trainerStore = require('../models/trainer-store');
const accounts = require ('./accounts.js');
const userStore = require('../models/member-store');

const dashboard = {
    index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      name: 'Trainer Dashboard',
      member: trainerStore.getUserMembers(loggedInUser.id),
    };
    logger.info('about to render', trainerStore.getAllMembers().members);
    response.render('dashboard', viewData);
  },
  
    deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member( ${memberId}`);
    trainerStore.removeMember(memberId);
    response.redirect('/dashboard');
  },

    addMember(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newMember = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      stats: [],
    };
    logger.debug('Creating a new Member', newMember);
    trainerStore.addMember(newMember);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;