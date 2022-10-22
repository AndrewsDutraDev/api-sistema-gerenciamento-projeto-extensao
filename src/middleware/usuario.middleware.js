import jwt from 'jsonwebtoken';

const SECRET = 'andrews250500';

function VerifyToken(req, res, next) {
  const token = req.headers.authorization;

  jwt.verify(token, SECRET, (err) => {
    if (err) return res.status(401).json({ error: 'User unauthorized' });

    return next();
  });
}

export default VerifyToken;
