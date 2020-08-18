'use strict';

const accounts = require ('../controllers/accounts.js');
const logger = require('../utils/logger');

const _ = require('lodash');
const JsonStore = require('./json-store');

const userStore = {

  store: new JsonStore('./models/members.json', { members: [] }),
  collection: 'members',
  other: 'members.stats',

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
  
    getStats(id,statId) {
    const member = this.getUser(id);
    const stats = (member.stats, { statId: statId });
    const comment = member.stats.find(stat => stats.statId === statId).comment;
    logger.info(`Testing stat ${comment}`);
    return stats;//this.store.findBy(this.other, { statId: statId });
    
      
    return this.store.findOneBy(this.collection.stats, { statId: statId });
     
    
      
    //const stats = member.stats
  },
  updateStat(id, statId, updatedStat) {
    const stats = this.getStats(id, statId);
    
    logger.info(`Updating Stat ${statId} from stat ${stats}`);
    stats.comment = updatedStat.comment;
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