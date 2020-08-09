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
    const height = member.height;
    const weight = request.body.weight;
    const BMI= ((weight)/(height*height))*10000; //calculates BMI
    const roundBMI = (Math.round((BMI*100))/100);
    member.bmi = roundBMI;
    var bmiCat = "Test";
      
        if (member.bmi <16)
        {
            bmiCat =  "SEVERELY UNDERWEIGHT";
        }
        else if (member.bmi >=16 && member.bmi<18.5)
        {
            bmiCat = "UNDERWEIGHT";
        }
        else if (member.bmi >=18.5 && member.bmi<25)
        {
            bmiCat = "NORMAL";
        }
        else if (member.bmi >=25 && member.bmi <30)
        {
            bmiCat = "OVERWEIGHT";
        }
        else if (member.bmi >=30 && member.bmi <35)
        {
            bmiCat = "MODERTLY OBESE";
        }
        else
        {
            bmiCat = "SEVERLY OBESE";
        }
    
    
    const newStat = {
      id: uuid.v1(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
      bmi: roundBMI,
      bmiCat: bmiCat
    };
    userStore.addStat(memberId, newStat);
    response.redirect('/member/' + memberId);
  },
  
    
      determineBMICategory()
    {
        const roundBMI = member.bmi;

        const bmiCat ="";

        if (roundBMI <16)
        {
            bmiCat =  "SEVERELY UNDERWEIGHT";
        }
        else if (roundBMI >=16 && roundBMI<18.5)
        {
            bmiCat = "UNDERWEIGHT";
        }
        else if (roundBMI >=18.5 && roundBMI<25)
        {
            bmiCat = "NORMAL";
        }
        else if (roundBMI >=25 && roundBMI <30)
        {
            bmiCat = "OVERWEIGHT";
        }
        else if (roundBMI >=30 && roundBMI <35)
        {
            bmiCat = "MODERTLY OBESE";
        }
        else
        {
            bmiCat = "SEVERLY OBESE";
        }
        return bmiCat;
    }
  
};


module.exports = member;

