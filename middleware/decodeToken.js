const UserModel = require("../models/User");
const jwt = require('jsonwebtoken')

const decodeToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({ error: 'Authorization header missing or malformed.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, 'mytoken');

        const user = await UserModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Security constraints
        if (user.token !== token) {
            return res.status(403).json({ error: 'Token mismatch.' });
        }

       const isVerifyRoute = req.originalUrl === '/api/user/verify' || req.originalUrl === '/api/user/resend-code';
        console.log(req.originalUrl)
        if (!user.isLogin && !isVerifyRoute) {
            return res.status(403).json({ error: 'User is not logged in.' });
        }

        // Optional: check if account is deactivated, locked, etc.
        // if (user.status === 'inactive') {
        //     return res.status(403).json({ error: 'Account is inactive.' });
        // }

        // Attach user info to req
        req.userId = user._id;
        req.name = user.name;
        req.accountType = user.accountType;
        req.email = user.email;
        req.user = user;

        next();
    } catch (error) {
        console.error('Token decoding error:', error);
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
};

module.exports = decodeToken;
