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
    const member = this.getUser(id);
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
    _.remove(member.stats, { statId: statId });
    this.store.save();
  },
  
  getUserMembers(userid) {
    return this.store.findOneBy(this.collection, { userid: userid });
    },
  getBMI(id){
    const member = this.getUser(id);
    const recentStats = member.stats.length -1;
   
    const bmi = member.stats.indexOf(recentStats).bmi;
    return bmi;
  },
  
    getStat(memberId, statId) {
    const member = this.getUser(memberId);
   logger.info(`Testing stat ${this.store.findOneBy(this.collection.stats, { statId: statId }).bmi}`);
    return this.store.findOneBy(this.collection.stats, { statId: statId });
      
    //const stats = member.stats
  },
  updateStat(memberId, statId, updatedStat) {
    const member = this.getUser(memberId);
    const stat = this.getStat(memberId, statId);
    
    logger.info(`Updating Stat ${statId} from stat ${stat}`);
    stat.comment = updatedStat.comment;
    this.store.save();
  },
      

  
  updateUser(member, updatedMember) {
    member.name = updatedMember.name;
    member.gender = updatedMember.gender;
    member.email = updatedMember.email;
    member.password = updatedMember.password;
    member.address = updatedMember.address;
    member.height = updatedMember.height;
    member.startingWeight = updatedMember.startingWeight;
    
    this.store.save();
  }
  
};
module.exports = userStore;