const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service like 'hotmail'
    auth: {
        user: process.env.EMAIL_FROM,       // Your email
        pass: process.env.EMAIL_PASSWORD    // Your email app password
    }
});

async function sendVerificationCode(to, code) {
    console.log(process.env.EMAIL_FROM)
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Your Verification Code',
        html: `
            <div style="font-family:Arial,sans-serif;">
                <h2>Email Verification</h2>
                <p>Your verification code is:</p>
                <h1 style="color:#2E86C1;">${code}</h1>
                <p>This code is valid for 5 minutes.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification code sent to ${to}`);
    } catch (err) {
        console.error('Error sending email:', err);
        throw err;
    }
}

module.exports = { sendVerificationCode };
