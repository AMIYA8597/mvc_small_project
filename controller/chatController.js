const express = require('express');
const randomstring = require('randomstring');
const ChatModel = require("../model/chat.js");
const router = express.Router();
// const bodyParser = require('body-parser');

router.use(express.json());

// parse application/json
// router.use(bodyParser.json());


module.exports = {

    get_users: async (req, res, next) => {

        console.log("this is get request of all chat application page");
        try {
            const response = await ChatModel.find();
            console.log("response is ",response);

            res.send({ status: 200, resultFound: response.length, chat: response });
        } catch (err) {
            res.status(500).send(err);
        }
    },

}































// function generateOTP() {
//     return randomstring.generate({
//         length: 6,
//         charset: 'numeric'
//     });
// }

// // Send OTP to the provided mobile number
// exports.sendOTP = async (req, res, next) => {
//     try {
//         const { mobileNumber } = req.query;
//         const otp = generateOTP(); // Generate a 6-digit OTP
//         const newOTP = new Otps({ mobileNumber, otp });
//         await newOTP.save();

//         // Send OTP via SMS
//         await sendSMS({
//             to: mobileNumber,
//             message: `Your Mobile Number OTP is: ${otp}`,
//         });

//         res.status(200).json({ success: true, message: 'OTP sent successfully' });
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         res.status(500).json({ success: false, error: 'Internal server error' });
//     }
// };

// // Verify OTP provided by the user
// exports.verifyOTP = async (req, res, next) => {
//     try {
//         const { mobileNumber, otp } = req.query;
//         const existingOTP = await Otps.findOneAndDelete({ mobileNumber, otp });

//         if (existingOTP) {
//             // OTP is valid
//             res.status(200).json({ success: true, message: 'OTP verification successful' });
//         } else {
//             // OTP is invalid
//             res.status(400).json({ success: false, error: 'Invalid OTP' });
//         }
//     } catch (error) {
//         console.error('Error verifying OTP:', error);
//         res.status(500).json({ success: false, error: 'Internal server error' });
//     }
// };
