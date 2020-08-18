"use strict";

const logger = require("../utils/logger");
const userStore = require("../models/member-store");

const stat = {
  index(request, response) {
    const memberId = request.params.id;
    const statId = request.params.statId;
    logger.debug(`Editing Stat ${statId} from Playlist ${memberId}`);
    const viewData = {
      name: "Edit Stat",
      member: userStore.getUser(memberId),
      stat: userStore.getStat(userStore, statId)
    };
    response.render("stat", viewData);
  },

  updateStat(request, response) {
    const memberId = request.params.id;
    const statId = request.params.statId;
    const stat = userStore.getSong(memberId, statId);
    logger.info(`UserID: ${memberId}`);
    const member = userStore.getUser(memberId);

    var comment = request.body.commment;
    
    const newStat = {

      comment: comment,

    };
    logger.debug(`Updating Song ${statId} from Playlist ${memberId}`);
    userStore.updateStat(stat, newStat);
    response.redirect("/playlist/" + memberId);
  }
};

module.exports = stat;


