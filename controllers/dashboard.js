"use strict";

const uuid = require('uuid');
const logger = require("../utils/logger");
const trainerStore = require('../models/trainer-store');
const accounts = require ('./accounts.js');
const userStore = require('../models/member-store');


 
  const dashboard = {
    index(request, response) {
    logger.info('dashboard rendering');
    //const user = userStore.getUserByEmail(request.body.email);
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info(`Logged in User From Dashboard: ${loggedInUser.email}`);
    const viewData = {
      name: 'Trainer Dashboard',
      //member: trainerStore.getUserMembers(loggedInUser.id),
      member: userStore.getAllUsers(loggedInUser.id),
    };
    logger.info('Trainer members:', userStore.getUser(loggedInUser.id));

    const userEmail = request.cookies.member;
    const trainerEmail = request.cookies.trainer;
    if(userEmail != "")
      {
        const user = userStore.getUserByEmail(request.body.email);
        logger.info(`User Email returned from getCurrentUser: ${userEmail}`);
        //response.cookie('member', user.email);
        logger.info(`logging in member ${user.email}`);
        logger.info(`logging in member ${user.id}`);
        response.redirect('/member/'+ user.id);
        //response.render('userDashboard', viewData);
      }
    else
      {
        logger.info(`Trainer Email returned from getCurrentUser: ${trainerEmail}`);
        response.render('dashboard', viewData);
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
