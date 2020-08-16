"use strict";

const logger = require("../utils/logger");

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
