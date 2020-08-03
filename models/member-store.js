'use strict';

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

 getAllUsers() {
    return this.store.findAll(this.collection);
  },

  getUser(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  getUser(trainerId) {
   // return this.store.findById(this.collection, { trainerId: trainerId });
    return this.store.find(this.collection, {'trainerId': trainerId});
   
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
    }
};
module.exports = userStore;