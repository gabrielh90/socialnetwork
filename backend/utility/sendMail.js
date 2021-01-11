var nodemailer = require('nodemailer');

const sendMail = (recipient, title, message) => {
    myEmail = '@gmail.com';
    myPassword = ''
    let error = false, returnMessage = '';
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: myEmail,
          pass: myPassword
        }
      });
    var mailOptions = {
    from: myEmail,
    to: recipient,
    subject: title,
    text: message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          // console.log(error);
          error = true
          returnMessage = error;
        } else {
          error = false
          returnMessage: {info: info}
          // console.log(info);
        }
    });
    return {error: error, message: returnMessage}
}

module.exports = sendMail;