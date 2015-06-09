'use strict';

var express = require('express');
var controller = require('./board.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();


router.get('/', controller.index);
router.get('/getbyuser/:userId', auth.isAuthenticated(), controller.getByUser)
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;