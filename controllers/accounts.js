'use strict';

const trainerstore = require('../models/trainer-store');
const userstore = require('../models/member-store');
const logger = require('../utils/logger');
const uuid = require('uuid');


const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('member', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    const startingWeight = user.startingWeight;
    const height = user.height;
    const initialBMI= ((startingWeight)/(height*height))*10000; //calculates BMI
    const roundBMI = (Math.round((initialBMI*100))/100);
    user.bmi = roundBMI;
    
        var bmiCat = "Test";
      
        if (roundBMI<16)
        {
            bmiCat =  "SEVERELY UNDERWEIGHT";
        }
        else if (roundBMI>=16 && roundBMI <18.5)
        {
            bmiCat = "UNDERWEIGHT";
        }
        else if (roundBMI >=18.5 && roundBMI <25)
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
    
    user.bmiCat = bmiCat;
    
    
        var weightCheck = "";
        var idealWeight = false;
        const inchHeight = user.height/2.54;
        var excessInches = 0;
        var calcIdealWeight = 0;
        var gender = user.gender;



        if (inchHeight > 60) // if the member is over 5 ft
        {
            excessInches = inchHeight - 60; // calculate the number of excess inches
        }

        if (gender = "male" || "Male")
        {
            calcIdealWeight =  (50 + (2.3 * excessInches)); //if excessInches has remained as 0 (person is therefore under 5ft & 50 + 0 is still 50) if not calculation are made on each inch above 5 ft
            if ((startingWeight >= (calcIdealWeight - 0.2)) && (startingWeight <= (calcIdealWeight + 0.2))) //allowing for buffer of +/- 0.2kg
            {
                idealWeight = true; //if not boolean remains false
            }
        }
        else
        {
            calcIdealWeight = (45.5 + (2.3 * excessInches)); // same as above with weights changed as the person is either Female or non Specified
            if ((startingWeight >= (calcIdealWeight - 0.2)) && (startingWeight <= (calcIdealWeight + 0.2)))
            {
                idealWeight = true;
            }

        }
        if (idealWeight) //Returns String response based on the boolean value passed to it.
        {
            weightCheck += "You are an Ideal Weight";
        }
        else
        {
            weightCheck += "Your Weight is not Ideal";
        }
        
    
    user.weightCheck = weightCheck;
    userstore.addUser(user);
    user.stats = [];
    user.date = "";
    logger.info(`registering startWeight ${startingWeight}`); 
    logger.info(`registering height ${height}`);
    //logger.info(`registering roundBMI ${roundBMI`);
    //user.stats.bmi = userstore.getBMI(user.id);

    response.redirect('/');
  },
  
  checkMemberPassword(request, response)
    {
      const user = userstore.getUserByEmail(request.body.email);
      
      if(user.password = this.password)
        return this.password.equals(user.password);
    },

  authenticate(request, response) {

    const userEmail = userstore.getUserByEmail(request.body.email);
    const userPassword = userstore.getUserByPassword(request.body.password);
    const trainerEmail = trainerstore.getTrainerByEmail(request.body.email);
    const trainerPassword = trainerstore.getTrainerByPassword(request.body.password);
    logger.info(`logging in member ${trainerEmail}`);
    
    if (userEmail && userPassword) {
      response.cookie('member', userEmail.email);
      logger.info(`logging in member ${userEmail.email}`);
      response.redirect('/member/'+ userEmail.id);
    }
    else if (trainerEmail) {      
      response.cookie('trainer', trainerEmail.email);
      logger.info(`logging in trainer ${trainerEmail.email}`);
      response.redirect('/dashboard');
    } 
    else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.member;
    const trainerEmail = request.cookies.trainer;
    if(userEmail != "")
      {
        logger.info(`User Email returned from getCurrentUser: ${userEmail}`);
        return userstore.getUserByEmail(userEmail);
      }
    else
      {
        logger.info(`Trainer Email returned from getCurrentUser: ${trainerEmail}`);
        return trainerstore.getTrainerByEmail(trainerEmail);
      }   
  },
};

module.exports = accounts;