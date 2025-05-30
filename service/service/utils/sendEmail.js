const nodemailer = require('nodemailer');
const { Model } = require('sequelize');

const sendEmail = async ( to,subject, text)=>{
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hptestplatform@gmail.com',
            pass: 'asdf@QWE1984'
        },
    });
    let mailOptions = {
        from : '"Society Management" < hptestplatform@gmail.com >',
        to,
        subject,
        text,
    };
    await transporter.sendMail(mailOptions);
};

Model.exports = sendEmail;