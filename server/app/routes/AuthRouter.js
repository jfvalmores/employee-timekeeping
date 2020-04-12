const express = require('express')

const AuthCtrl = require('../controllers/AuthController')
const router = express.Router()

router.post('/login', AuthCtrl.login)
router.post('/logout', AuthCtrl.logout)

module.exports = router