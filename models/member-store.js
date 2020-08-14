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
    
    var test = _.remove(member.stats, { id: statId });
    logger.info(`Testing member!!!!!!!!!! :  ${member.height}`);
    _.remove(member.stats, { statId: statId });
   // delete(member.stats, { id: statId });
    logger.info(`Attempting to Remove Stat :  ${statId}`);
    logger.info(`Attempting to Remove Test :  ${test}`);
  },
  
  getUserMembers(userid) {
    return this.store.findBy(this.collection, { userid: userid });
    },
  getBMI(id){
    const member = this.getUser(id);
    const recentStats = member.stats.length -1;
   
    const bmi = member.stats.indexOf(recentStats).bmi;
    return bmi;
  }
  
};
module.exports = userStore;