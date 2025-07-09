const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  console.log('🛡️ Auth middleware triggered');

  try {
    const token = req.cookies.token;
    console.log('🍪 Cookie token:', token);

    if (!token) {
      console.log('❌ No token found in cookies');
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('✅ JWT decoded:', decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      console.log('❌ User not found in DB');
      return res.status(401).json({ message: 'User not found' });
    }


    req.user = user;
    console.log('✅ User found:', user.email);
    next();
  } catch (error) {
    console.log('❌ Auth middleware error:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
