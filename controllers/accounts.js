'use strict';

const memberstore = require('../models/member-store');
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
    memberstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const member = memberstore.getMemberByEmail(request.body.email);
    if (member) {
      response.cookie('member', member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.member;
    return memberstore.getMemerByEmail(memberEmail);
  },
};

module.exports = accounts;