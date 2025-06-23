const express = require('express');
const decodeToken = require('../middleware/decodeToken');
const isAdmin = require('../middleware/isAdmin');
const statsController = require('../controllers/stats.controller');

const router = express.Router();

router.get('/users', decodeToken, isAdmin, statsController.getTotalUsers);
router.get('/tontines', decodeToken, isAdmin, statsController.getTontineStats);
router.get('/contributions', decodeToken, isAdmin, statsController.getTotalContributions);
router.get('/balance', decodeToken, isAdmin, statsController.getTotalBalance);

module.exports = router;
