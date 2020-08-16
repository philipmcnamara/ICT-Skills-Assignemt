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
    return this.store.findBy(this.collection, { userid: userid });
    },
  getBMI(id){
    const member = this.getUser(id);
    const recentStats = member.stats.length -1;
   
    const bmi = member.stats.indexOf(recentStats).bmi;
    return bmi;
  },
  
    getStat(id, statId) {
    const member = this.store.findOneBy(this.collection, { id: id });
    const stats = member.songs.filter(song => song.id == statId);
    return stats[0];
  },

  updateStat(stat, updatedStat) {
    
    stat.duration = updatedStat.duration;
    stat.weight = updatedStat.weight,
    stat.chest= updatedStat.chest,
    stat.thigh= updatedStat.thigh,
    stat.upperArm= updatedStat.upperArm,
    stat.waist= updatedStat.waist,
    stat.hips= updatedStat.hips,
    stat.bmi= updatedStat.bmi,
    stat.bmiCat= updatedStat.bmiCat,
    stat.weightCheck= updatedStat.weightCheck,
    stat.lostWeight= updatedStat.lostWeight,
    this.store.save();
  }
  
};
module.exports = userStore;