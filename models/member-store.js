'use strict';

const accounts = require ('../controllers/accounts.js');
const logger = require('../utils/logger');

const _ = require('lodash');
const JsonStore = require('./json-store');

const userStore = {

  store: new JsonStore('./models/members.json', { members: [] }),
  collection: 'members',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  getUserByPassword(password) {
    return this.store.findOneBy(this.collection, { password: password });
  },

 getAllUsers() {
    return this.store.findAll(this.collection);
  },

  getUser(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },


  addUser(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },

  removeUser(id) {
    const member = this.getMember(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },

  removeAllUsers() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addStat(id, stat) {
    const member = this.getUser(id);
    member.stats.push(stat);
    this.store.save();
  },

  removeStat(id, statId) {
    const member = this.getUser(id);
    const stats = member.stats;
    _.remove(stats, { id: statId});
    this.store.save();
  },
  
  getUserMembers(userid) {
    return this.store.findBy(this.collection, { userid: userid });
    },

  
  calculateMemberBMI (request) {   

    const BMI = 0;
    const roundBMI = 0;
    const calcHeight = 0;
    const memberStatWeight =0;
    const user = accounts.getCurrentUser();
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
module.exports = userStore;