const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';

const accessTokenOptions = {
  expires: new Date(Date.now() + 7 * 60 * 60 * 60 * 1000),
  maxAge: 7 * 60 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'none',
}

const generateToken = (user, res) => {
  const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '7d' });
  res.cookie("access_token", token, accessTokenOptions);
  return token
};

module.exports.generateToken = generateToken








