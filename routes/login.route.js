const express = require('express');
const router = express.Router()
const login_controller = require('../controllers/login.controller')

router.post('/api/login', login_controller.autentification)

module.exports = router
