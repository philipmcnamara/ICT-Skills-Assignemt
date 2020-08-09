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
    member.bmiCat = bmiCat;
    
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
  
    
isIdealBodyWeight()
    {
        const weightCheck = "";
        var idealWeight = false;
        //Member member = getLoggedInMember();
        //List<Stat> stats = member.stats;
        const weight = request.body.weight;
        const height = member.height;
      
        var excessInches = 0;
        var calcIdealWeight = 0;
        String gender = getLoggedInMember().getGender();

        Logger.info ("hCon = " + hCon);



        if (hCon > 60) // if the member is over 5 ft
        {
            excessInches = hCon - 60; // calculate the number of excess inches
        }
        Logger.info ("Excess Inches = " + excessInches);
        if (getLoggedInMember().getGender().equals("male"))
        {
            calcIdealWeight = (float) (50 + (2.3 * excessInches)); //if excessInches has remained as 0 (person is therefore under 5ft & 50 + 0 is still 50) if not calculation are made on each inch above 5 ft
            if ((memberStatWeight >= (calcIdealWeight - 0.2)) && (memberStatWeight <= (calcIdealWeight + 0.2))) //allowing for buffer of +/- 0.2kg
            {
                idealWeight = true; //if not boolean remains false
            }
        }
        else
        {
            calcIdealWeight = (float) (45.5 + (2.3 * excessInches)); // same as above with weights changed as the person is either Female or non Specified
            if ((memberStatWeight >= (calcIdealWeight - 0.2)) && (memberStatWeight <= (calcIdealWeight + 0.2)))
            {
                idealWeight = true;
            }
            Logger.info ("Weight = " + memberStatWeight);
            Logger.info ("calcIdealWeight = " + calcIdealWeight);
        }
        if (idealWeight) //Returns String response based on the boolean value passed to it.
        {
            weightCheck += "You are an Ideal Weight";
        }
        else
        {
            weightCheck += "Your Weight is not Ideal";
        }
        return weightCheck;
    }
  
};


module.exports = member;

