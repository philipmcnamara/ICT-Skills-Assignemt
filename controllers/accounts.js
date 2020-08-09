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
    userstore.addUser(user);
    user.stats = [];
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