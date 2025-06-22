const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
    }
});

// 🔐 Send 6-digit email verification code
async function sendVerificationCode(to, code) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Your Verification Code',
        html: `
            <div style="font-family:Arial,sans-serif;">
                <h2>Email Verification</h2>
                <p>Your verification code is:</p>
                <h1 style="color:#2E86C1;">${code}</h1>
                <p>This code is valid for 5 minutes.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification code sent to ${to}`);
    } catch (err) {
        console.error('Error sending verification email:', err);
        throw err;
    }
}

// 🔐 Send reset password email with generated password
async function sendResetPassword(to, newPassword) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject: '🔐 Your New Password',
        html: `
            <div style="font-family:Arial,sans-serif;">
                <h2>Password Reset</h2>
                <p>Your password has been reset successfully. Here is your new password:</p>
                <h1 style="color:#27ae60;">${newPassword}</h1>
                <p>Please log in and change it as soon as possible.</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Password reset sent to ${to}`);
    } catch (err) {
        console.error('Error sending reset password email:', err);
        throw err;
    }
}

module.exports = {
    sendVerificationCode,
    sendResetPassword,
    transporter, // optional export if needed elsewhere
};
