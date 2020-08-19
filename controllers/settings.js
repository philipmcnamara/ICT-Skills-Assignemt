
const logger = require("../utils/logger");
const userStore = require("../models/member-store");

const settings = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug(`Editing Member ${memberId} ${memberId}`);
    const viewData = {
      name: "Member Name",
      member: userStore.getUser(memberId),    
    };
    response.render("settings", viewData);
  },

  updateMember(request, response) {
    const memberId = request.params.id;
    const member = userStore.getUser(memberId);
    logger.info(`8888888888888888888888888888888888888888 ${member.name} ${member.gender}`);
    
    const memberChange = {   
      
      name: request.body.name,
      gender: request.body.gender,
      password: request.body.password,
      address: request.body.address,
      height: request.body.height,
      startingWeight: request.body.startingWeight,
    };
    
    logger.debug(`Updating Member ${memberId}`);
    userStore.updateUser( memberChange, memberId);
    response.redirect("/settings/" + memberId);
  }
};

module.exports = settings;