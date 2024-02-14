const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function generateAccessToken(user){
    const payload = {
        Username: user.Username,
        Email: user.Email
    };

    const secret = process.env.JWT_SECRET_KEY;
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secret, options)
}

function verifyAccessToken(token){
    const secret = process.env.JWT_SECRET_KEY;

    try{
        const decoded = jwt.verify(token, secret);
        return {success: true, data: decoded};
    } catch(e){
        return {success: false, error: e.message};
    }
}

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.sendStatus(401);
    }

    const result = verifyAccessToken(token);

    if(!result.success){
        return res.status(403).json({ error: result.error })
    } 

    req.user = result;
    next()
}

module.exports = { generateAccessToken, authenticateToken };