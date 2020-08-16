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
    const statId = request.params.statId;
    logger.info(`Deleting Stat ${statId} from Member ${memberId}`);
    userStore.removeStat(memberId, statId);
    response.redirect('/Member/' + memberId);
  },
  
  
    addStat(request, response) {
    logger.info(`Entered addStat`);
    const memberId = request.params.id;
    logger.info(`UserID: ${memberId}`);
    const member = userStore.getUser(memberId);
    const height = member.height;
    var weight = parseFloat(request.body.weight);
    const BMI= ((weight)/(height*height))*10000; //calculates BMI
    const roundBMI = (Math.round((BMI*100))/100);
    member.bmi = roundBMI;
      
    var bmiCat = "";
    var weightCheck = "test";
    var idealWeight = false;
    const inchHeight = height/2.54;
    var excessInches = 0;
    var calcIdealWeight = 0;
    var gender = member.gender;
      
       logger.info(`inchHeight :  ${inchHeight}`);

      
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
      



        if (inchHeight > 60) // if the member is over 5 ft
        {
            excessInches = inchHeight - 60; // calculate the number of excess inches
        }

        if (gender == "male" || gender == "Male")
        {
            calcIdealWeight =  (50 + (2.3 * excessInches)); //if excessInches has remained as 0 (person is therefore under 5ft & 50 + 0 is still 50) if not calculation are made on each inch above 5 ft
            if ((weight >= (calcIdealWeight - 0.2)) && (weight <= (calcIdealWeight + 0.2))) //allowing for buffer of +/- 0.2kg
          
            {
                idealWeight = true; //if not boolean remains false
            } 
        }
        else
        {
            calcIdealWeight = (45.5 + (2.3 * excessInches)); // same as above with weights changed as the person is either Female or non Specified
            if ((weight >= (calcIdealWeight - 0.2)) && (weight <= (calcIdealWeight + 0.2)))
                  logger.info('calcIdealWeight = ', calcIdealWeight);
                  logger.info('excessInches = ', excessInches);
            {
                idealWeight = true;
            }

        }
        if (idealWeight == true) //Returns String response based on the boolean value passed to it.
        {
            weightCheck = "You are an Ideal Weight";
        }
        else
        {
            weightCheck = "Your Weight is not Ideal";
        } 
        member.weightCheck = weightCheck;
      
      logger.info(`calcIdealWeight :  ${calcIdealWeight}`);
      logger.info(`excessInches :  ${excessInches}`);
      logger.info(`idealWeight :  ${idealWeight}`);

    var previousWeight = parseFloat(0);
    const lastElement = 0;
    logger.info(`length :  ${member.stats.length}`);
    if(member.stats.length > 0)
      {
        const lastElement = member.stats.length -1;
        previousWeight = member.stats[lastElement].weight;
        logger.info(`Greater Than 0 :  ${member.stats.length}`);
      }
    else
      {
        previousWeight = member.startingWeight;
        logger.info(`0 :  ${member.stats.length}`);
      }
    
    var lostWeight = false;
    logger.info(`lostWeight being false :  ${lostWeight}`);
      
    logger.info(`lastElement :  ${lastElement}`);
    logger.info(`previousWeight :  ${previousWeight}`);
    logger.info(`Weight :  ${weight}`);
      
    var lostWeight = (weight < previousWeight) ? true:false;
   /* if(weight < previousWeight)
      {
          lostWeight = true;
          logger.info(`lostWeight being true :  ${lostWeight}`);
      }*/
    logger.info(`Lost Weight :  ${lostWeight}`);
      
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
      if(dd<10) 
      {
          dd='0'+dd;
      } 

      if(mm<10) 
      {
          mm='0'+mm;
      } 
      today = mm+'-'+dd+'-'+yyyy;
      console.log(today);
      today = mm+'/'+dd+'/'+yyyy;
      console.log(today);
      today = dd+'-'+mm+'-'+yyyy;
      console.log(today);
      today = dd+'/'+mm+'/'+yyyy;
      console.log(today);
      
      

    const newStat = {
      today: today,
      statId: uuid.v1(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
      bmi: roundBMI,
      bmiCat: bmiCat,
      weightCheck: weightCheck,
      comment: request.body.commment,
      lostWeight: lostWeight
      
      
    };
    userStore.addStat(memberId, newStat);
    response.redirect('/member/' + memberId);
  },
    

};


module.exports = member;

