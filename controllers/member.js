'use strict';
const uuid = require('uuid');

const logger = require('../utils/logger');
const userStore = require('../models/member-store');
const accounts = require ('./accounts.js');

const member = {
  index(request, response) {
    const memberId = request.params.id;
    logger.info(`MemberId test: ( ${memberId}`);
    logger.info('Member id = ', memberId);
    const viewData = {
      name: 'Member',
      member: userStore.getUser(memberId),
    };
    response.render('member', viewData);
  },
    deleteStat(request, response) {
    const memberId = request.params.id;
    const statId = request.params.statsId;
    logger.debug(`Deleting Stat ${statId} from Member ${memberId}`);
    userStore.removeStat(memberId, statId);
    response.redirect('/Member/' + memberId);
  },
    addStat(request, response) {
    logger.info(`Entered addStat`);
    const memberId = request.params.id;
    logger.info(`UserID: ${memberId}`);
    const member = userStore.getUser(memberId);
    
    const newStat = {
      id: uuid.v1(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    userStore.addStat(memberId, newStat);
    member.calculateMemberBMI(request);
    response.redirect('/member/' + memberId);
  },
  
    calculateMemberBMI (request) {   

    const BMI = 0;
    const roundBMI = 0;
    const calcHeight = 0;
    const memberStatWeight =0;
    const user = accounts.getCurrentUser(request);
    const stats = user.stats;

    logger.info(`logging in member ${BMI}`);
        logger.info(`logging in member ${roundBMI}`);
        logger.info(`logging in member ${calcHeight}`);
        logger.info(`logging in member ${memberStatWeight}`);
        logger.info(`logging in member ${user.email}`);
            logger.info(`logging in member ${stats.height}`);
    
    
    /*if(stats.size() != 0)
    {
        const mostRecent = stats.size() -1;
        memberStatWeight = stats.get(mostRecent).getWeight();
    }
    BMI= ((memberStatWeight)/(calcHeight*calcHeight)); //calculates BMI
    roundBMI = ((BMI*100)/100.0); // rounds to 2 decimals
    return roundBMI;   */
}

  
};


module.exports = member;