const express = require('express');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controller');

router.get('/profile', usersConrtoller.profile);

router.get('/signup',usersConrtoller.signup)

router.get('/signin',usersConrtoller.signin)

router.post('/create',usersConrtoller.create)


module.exports = router;