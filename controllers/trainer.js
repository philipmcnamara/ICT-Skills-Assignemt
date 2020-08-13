'use strict';
const uuid = require('uuid');

const logger = require('../utils/logger');
const trainerStore = require('../models/trainer-store');

const trainer = {
  index(request, response) {
    const trainerId = request.params.id;
    logger.debug('trainer id = ', trainerId);
    const viewData = {
      name: 'trainer',
      member: trainerStore.getMember(trainerId),
    };
    response.render('trainer', viewData);
  },
  
  addcomment (request, response) 
  {
    const trainerId = request.params.id;
    const statId = request.params.statsId;
    stat.Comment = comment

  };
  userStore.addStat(memberId, newStat);
  
  
      public static void addComment (Long id, Long statid, String Comment)
    {
        Member member = Member.findById(id);
        Stat stat = Stat.findById(statid);
        Logger.info ("Adding" + stat.Comment);
        stat.Comment = Comment;
        stat.save();
        member.save();
        render("trainermemberview.html", member);
    }
  
};

module.exports = trainer;