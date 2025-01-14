const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretkey').secretKey;

async function verifyToken(req,res,next){
  // 인증 완료
  try {
    req.decoded = jwt.verify(req.cookies.accessToken, secretKey);
    return next();
  }
  // 인증 실패 
  catch(error) {
    if (error.name === 'TokenExpireError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.'
      });
    }
   return res.status(401).json({
     code: 401,
     message: '유효하지 않은 토큰입니다.'
   });
  }
}


module.exports={
    verifyToken:verifyToken
}