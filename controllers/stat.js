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
      member: userStore.getUser(userStore),
      stat: userStore.getStat(userStore, statId)
    };
    response.render("stat", viewData);
  },

  update(request, response) {
    const memberId = request.params.id;
    const statId = request.params.statId;
    const stat = userStore.getSong(memberId, statId);
    logger.info(`UserID: ${memberId}`);
    const member = userStore.getUser(memberId);
    const height = member.height;
    var weight = parseFloat(request.body.weight);
    const BMI= ((weight)/(height*height))*10000; //calculates BMI
    const roundBMI = (Math.round((BMI*100))/100);
    member.bmi = roundBMI;
      
    var comment = "";
    
    const newStat = {

      comment: request.body.commment,

    };
    logger.debug(`Updating Stat ${statId} from Playlist ${memberId}`);
    userStore.updateStat(stat, newStat);
    response.redirect("/playlist/" + memberId);
  }
};

module.exports = stat;


