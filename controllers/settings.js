
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

  update(request, response) {
    const memberId = request.params.id;
    const newMember = {     
      name: request.body.name,
      gender: request.body.name,
      email: request.body.name,
      password: request.body.name,
      address: request.body.name,
      height: request.body.name,
      startingWeight: request.body.name,
    };
    logger.debug(`Updating Member ${memberId}`);
    userStore.updateUser( newMember);
    response.redirect("/settings/" + memberId);
  }
};

module.exports = settings;