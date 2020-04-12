const express = require('express')

const TimelogCtrl = require('../controllers/TimelogController')
const router = express.Router()

router.get('/timelog-type-list', TimelogCtrl.getTimelogList)
router.post('/timelog', TimelogCtrl.createTimelog)
router.put('/timelog/:employee_no', TimelogCtrl.updateTimelog)
router.delete('/timelog/:employee_no', TimelogCtrl.deleteTimelog)
router.get('/timelog/:employee_no', TimelogCtrl.getTimelogById)
router.get('/timelogs', TimelogCtrl.getAllTimelogs)

module.exports = router
