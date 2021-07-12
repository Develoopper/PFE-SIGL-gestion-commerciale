const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.FROM_EMAIL_PASSWORD
  }
});

const mailOptions = {
  from: process.env.FROM_EMAIL,
  to: process.env.TO_EMAIL,
  subject: 'Sauvegarde',
  text: getTodayDate(),
  attachments: [{
    filename: 'ppp.sqlite',
    path: 'ppp.sqlite'
  }]
};

module.exports = function send() {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error)
      console.log(error);
    else
      console.log('Email sent: ' + info.response);
  }); 
}

function getTodayDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  return dd + '/' + mm + '/' + yyyy;
}