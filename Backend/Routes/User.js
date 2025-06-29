const express = require('express');
const router = express.Router();

const { login, signup, validateToken, logout } = require('../Controller/Auth');

router.post('/login', login);
router.post('/signup', signup);
router.get('/validate-token', validateToken);
router.post('/logout', logout);

module.exports = router;