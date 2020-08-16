"use strict";

const logger = require("../utils/logger");
const trainerStore = require('../models/trainer-store');
const accounts = require ('./accounts.js');
const member = require ('./member.js');
const userStore = require('../models/member-store');
 

const settings = {
index(request, response) {
    
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      name: 'Trainer Dashboard',
      member: userStore.getAllUsers(),
    };
    response.render("settings", viewData);
  },
};

module.exports = settings;
