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
    response.redirect('/member/' + memberId);
  },
  
  
    calculateMemberBMI (request) {   
        
        const BMI = 0;
        const roundBMI = 0;
        const loggedInUser = accounts.getCurrentUser();
        const calcHeight = member.getHeight();
        const stats = member.stats;
        const memberStatWeight =0;

        if(stats.size() != 0)
        {
            const mostRecent = stats.size() -1;
            memberStatWeight = stats.get(mostRecent).getWeight();
        }
        BMI= ((memberStatWeight)/(calcHeight*calcHeight)); //calculates BMI
        roundBMI = ((BMI*100)/100.0); // rounds to 2 decimals
        return roundBMI;
    }
  
      CalculateMemberBMI()
    {
        float BMI = 0;
        float roundBMI;
        Member member = getLoggedInMember();
        float calcHeight = member.getHeight();
        List<Stat> stats = member.stats;
        float memberStatWeight =0;

        if(stats.size() != 0)
        {
            int mostRecent = stats.size() -1;
            memberStatWeight = stats.get(mostRecent).getWeight();
        }
        BMI= ((memberStatWeight)/(calcHeight*calcHeight)); //calculates BMI
        roundBMI = (float) (Math.round(BMI*100)/100.0); // rounds to 2 decimals
        return roundBMI;
    }

};


module.exports = member;