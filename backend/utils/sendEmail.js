var nodemailer = require('nodemailer');

const sendEmail = (options) => {
    const {recipient, title, message} = options;

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
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: recipient,
    subject: title,
    text: message
    };

    transporter.sendEmail(mailOptions, function(error, info){
      return {error, message: info}
    });
}

module.exports = sendEmail;