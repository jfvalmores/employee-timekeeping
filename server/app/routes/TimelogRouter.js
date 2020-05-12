const express = require('express');

const TimelogCtrl = require('../controllers/TimelogController');
const router = express.Router();

router.get('/timelog-type-list', TimelogCtrl.getTimelogList);
router.post('/timelog', TimelogCtrl.createTimelog);
router.put('/timelog/:id', TimelogCtrl.updateTimelog);
router.delete('/timelog/:id', TimelogCtrl.deleteTimelog);
router.get('/timelog/:id', TimelogCtrl.getTimelogById);
router.get('/timelogs/:employee_no', TimelogCtrl.getAllTimelogs);

module.exports = router;
