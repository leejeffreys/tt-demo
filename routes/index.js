var express = require('express');
var router = express.Router();

const fs   = require('fs');
const jwt  = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {

// Extract UN & PW from request
var userName = req.query.un;
var password = req.query.pw;
var delimiter = ':';

// PAYLOAD
var payload = {};
 // PRIVATE and PUBLIC key
 var privateKEY  = fs.readFileSync('./certificate/rsa2.key', 'utf8');
 var publicKEY  = fs.readFileSync('./certificate/public.pem', 'utf8');
 var i  = 'LivePerson';          // Issuer 
 var s  = userName + delimiter + password;        // UN/PW
 var a  = 'https://www.talktalk.co.uk'; // Audience



 // SIGNING OPTIONS
 var signOptions = {
  issuer:  i,
  subject:  s,
  audience:  a,
  expiresIn:  "12h",
  algorithm:  "RS256"
 };

 var token = jwt.sign(payload, privateKEY, signOptions);

 var body = "{ \"jwt\":\"" + token + "\"}";

 res.set('Content-Type', 'application/json');
 res.send(body);

});

module.exports = router;
