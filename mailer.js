const nodemailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport')

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'grady.bode@ethereal.email',
//         pass: 'ZJ39Y76Pw3eFKXmDeY'
//     },
   
// });

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    name: 'localhost',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'viktornaumov2011@mail.ru',
        pass: '22091951b'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    
});

module.exports.Mailer=mesage=>{
    
     transporter.sendMail(mesage,(err,info)=>{
        if (err) return console.log(err)
        console.log('Сообщение отправлено',info.envelope)
    })
};

