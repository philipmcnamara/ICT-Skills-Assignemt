'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const trainerStore = {

  
  store: new JsonStore('./models/trainers.json', { trainers: [] }),
  collection: 'trainers',
  

  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  getMember(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  
  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },

  removeMember(id) {
    const member = this.getMember(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },

  removeAllMembers() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addStat(id, stat) {
    const member = this.getMember(id);
    member.stats.push(stat);
    this.store.save();
  },

  removeStat(id, statId) {
    const member = this.getMember(id);
    const stats = member.stats;
    _.remove(stats, { id: statId});
    this.store.save();
  },
  
  getUserMembers(id) {
    return this.store.findBy(this.collection, { id: id });
  },
  
  getTrainerById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getTrainerByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  getTrainerByPassword(password) {
    return this.store.findOneBy(this.collection, { password: password });
  }
  
};

module.exports = trainerStore;