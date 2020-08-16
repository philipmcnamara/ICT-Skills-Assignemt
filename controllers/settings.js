"use strict";

const logger = require("../utils/logger");
const trainerStore = require('../models/trainer-store');
const accounts = require ('./accounts.js');
const member = require ('./member.js');
const userStore = require('../models/member-store');
 

const settings = {
  index(request, response) {
    logger.info("settings rendering");
    const viewData = {
      title: 'Member 1',
    };
    response.render("settings", viewData);
  },
};

module.exports = settings;
