'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const memberStore = {

  store: new JsonStore('./models/member-store.json', { memberCollection: [] }),
  collection: 'memberCollection',

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
  
    getUserMembers(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = memberStore;