
const logger = require("../utils/logger");
const userStore = require("../models/member-store");

const settings = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug(`Editing Member ${memberId} ${memberId}`);
    const viewData = {
      title: "Edit Song",
      playlist: userStore.getPlaylist(memberId),
      song: userStore.getSong(memberId, songId)
    };
    response.render("settings", viewData);
  },

  update(request, response) {
    const memberId = request.params.id;
    const newMember = {
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration)
    };
    logger.debug(`Updating Member ${memberId}`);
    userStore.updateUser(song, newSong);
    response.redirect("/settings/" + memberId);
  }
};

module.exports = settings;