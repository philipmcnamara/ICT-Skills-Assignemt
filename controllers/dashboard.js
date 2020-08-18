"use strict";

const uuid = require('uuid');
const logger = require("../utils/logger");
const trainerStore = require('../models/trainer-store');
const accounts = require ('./accounts.js');
const member = require ('./member.js');
const userStore = require('../models/member-store');
 
  const dashboard = {
    index(request, response) {

  
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      name: 'Trainer Dashboard',
      member: userStore.getAllUsers(),
    };

    const userEmail = request.cookies.member;
    const trainerEmail = request.cookies.trainer;
    if(userEmail != "")
      {
     
        logger.info(`User Email returned from getCurrentUser: ${userEmail}`);
        response.cookie('member', loggedInUser.email);
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
    userStore.removeUser(memberId);
    response.redirect('/dashboard');
  },

    addMember(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newMember = {
      date: "",
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      stats: [],
    };
    userStore.addUser(newMember);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
