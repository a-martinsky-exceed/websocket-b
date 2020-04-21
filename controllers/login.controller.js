const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const Login = require('../models/login.model');
const express = require('express');
const app = express();

// exports.registration = async (req, res) => {
//   const password = await argon2.hash(req.body.password)
//   const userRecord = new Login({
//     username: req.body.username,
//     password: password
//   })
//   userRecord.save(function(err) {
//     if(err) return next(err);
//     res.send(userRecord)
//   });
// }

exports.autentification = (req, res) => {
  Login.findOne({username: req.body.username}, (err, item)=> {
    const correctPassword = item && argon2.verify(item.password, req.body.password)
    const token = jwt.sign({item}, process.env.SECRET_KEY, { expiresIn: '6h' })
    if(!correctPassword) {
      return res.status(401).send({code: 201, description: 'User not found'})
    }
    else {
      const result = {status: 'OK'}
      return res.set({'x-test-app-jwt-token': token}).send(result)
    }
  })
}
