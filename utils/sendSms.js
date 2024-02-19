// // utils/sendSMS.js
// const twilio = require('twilio');

// const sendSMS = async (options) => {
//     const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

//     try {
//         await client.messages.create({
//             body: options.message,
//             from: process.env.TWILIO_PHONE_NUMBER,
//             to: options.to
//         });
//         console.log('SMS sent successfully');
//     } catch (error) {
//         console.error('Error sending SMS:', error);
//         throw error;
//     }
// };

// module.exports = sendSMS;
