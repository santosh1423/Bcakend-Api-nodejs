// Dependencies
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Models
var Voucher = require('../models/voucher');


var _ = require('lodash');

// Vouchers
Voucher.methods(['get', 'put', 'post', 'delete']);
Voucher.register(router, '/voucher');



// Return Router
module.exports = router;