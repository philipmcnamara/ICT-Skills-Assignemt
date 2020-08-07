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
    //logger.info(`Logged in User From Dashboard: ${loggedInUser.email}`);
    const viewData = {
      name: 'Trainer Dashboard',
      //member: trainerStore.getUserMembers(loggedInUser.id),
      member: userStore.getAllUsers(),
    };
    //logger.info('Trainer members:', userStore.getUser(loggedInUser.id));

    const userEmail = request.cookies.member;
    const trainerEmail = request.cookies.trainer;
    if(userEmail != "")
      {
        logger.info(`User Email returned from getCurrentUser: ${userEmail}`);
        response.cookie('member', loggedInUser.email);
        logger.info(`logging in member ${loggedInUser.email}`);
        logger.info(`logging in member ${loggedInUser.id}`);
        response.redirect('/member/'+ loggedInUser.id);
      }
    else if (trainerEmail != "")
      {
        logger.info(`Trainer Email returned from getCurrentUser: ${trainerEmail}`);
        response.render('dashboard', viewData);
      }
      else
        {
          response.render('/', viewData);
        }
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
