'use strict';

const trainerstore = require('../models/trainer-store');
const userstore = require('../models/member-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('member', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    if (user) {
      response.cookie('member', user.email);
      logger.info(`logging in ${user.email}`);
      logger.info(`logging in member ${user.email}`);
      const loggedInUser = accounts.getCurrentUser(request);
      response.redirect('/member/{{id}}');
    }
    else if (trainer){      
      response.cookie('trainer', trainer.email);
      logger.info(`logging in ${trainer.email}`);
      logger.info(`logging in trainer ${trainer.email}`);
      response.redirect('/dashboard');
    } 
    else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.member;
    //return trainerstore.getUserByEmail(userEmail);
  
    logger.info(`userEmail Current user: ${userEmail}`);
    logger.info(`User Id: ${userstore.getUserByEmail(userEmail).id}`);
    return userstore.getUserByEmail(userEmail);
  },
  getCurrentTrainer(request) {
    const userEmail = request.cookies.trainer;
    //return trainerstore.getUserByEmail(userEmail);
  
    logger.info(`userEmail Current user: ${userEmail}`);
    logger.info(`Trainer: ${trainerstore.getTrainerByEmail(userEmail).id}`);
    return trainerstore.getTrainerByEmail(userEmail);
  },
};

module.exports = accounts;