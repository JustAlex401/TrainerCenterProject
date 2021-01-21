const nodemailer = require('nodemailer');
const config = require('config');

const mail = function sendMail(email, login){
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: `${config.get('emailSend')}`,
            pass: `${config.get('emailPassword')}`
        }
    });
    
    let mailOptions = {
        from: `"ap8432446" <${config.get('emailSend')}>`,
        to: `${email}`,
        subject: 'Teste Templete ✔',
        html: `<a href="http://localhost:3000/api/auth/activate?login=${login}">Verify</a>`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}


module.exports = mail;