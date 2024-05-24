const nodemailer = require('nodemailer');
const {EMAIL,EMAIL_PASS} = require('../config/index');


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: EMAIL,
      pass: EMAIL_PASS,
    },
  });
  
  
const sendVerificationEmail = (email, token) => {
    console.log(EMAIL,EMAIL_PASS)
    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking the following link: http://localhost:8080/verify?token=${token}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
};

module.exports = sendVerificationEmail;