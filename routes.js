'use strict';

const express = require('express');
const router = express.Router();

const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const member = require('./controllers/member.js');
const accounts = require('./controllers/accounts.js');
const trainer = require('./controllers/trainer.js');
const settings = require('./controllers/settings.js');
const stat = require("./controllers/stat.js");

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/dashboard', dashboard.index);
router.get('/dashboard/deletemember/:id', dashboard.deleteMember);
router.post('/dashboard/addmember', dashboard.addMember);


router.get("/stat/:id/editstat/:statid", stat.index);
router.post("/stat/:id/updatestat/:statid", stat.update);

router.get('/settings/:id', settings.index);
router.post('/settings/updatemember/:id', settings.update);
router.get('/about', about.index);
router.get('/settings', settings.index);
router.get('/member/:id', member.index);
router.get('/trainermember/:id', trainer.index);
router.get('/member/:id/deletestat/:statId', member.deleteStat);
router.post('/member/:id/addstat', member.addStat);
router.post('/trainer/addComment', trainer.addComment);

module.exports = router;