// const nodemailer = require('nodemailer');

// const sendEmail = async (to, subject, text) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: Number(process.env.EMAIL_PORT),
//       secure: Number(process.env.EMAIL_PORT) === 465, 
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"HabitatPlush" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//     });

//     console.log('✅ Email sent successfully');
//   } catch (error) {
//     console.error('❗ Error sending email:', error);
//     throw new Error('Failed to send email');
//   }
// };

// module.exports = sendEmail;



const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"HabitatPlush" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log('✅ Email sent successfully');
  } catch (error) {
    console.error('❗ Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
const twilio = require("twilio")(accountSid, authToken);

await twilio.messages.create({
  body: `Your subscription has expired.`,
  from: "+1234567890",
  to: "+911234567890"
});

module.exports = sendEmail;