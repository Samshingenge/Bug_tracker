const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'codingsamwith@gmail.com',
    pass: '@2011julia',
  },
});

const mailOptions = {
  from: 'codingsamwith@gmail.com',
  to: '1samnatangwe@gmail.com',
  subject: 'Task Update',
  text: 'Your task has been updated!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});
