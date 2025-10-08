import jwt from 'jsonwebtoken';

const userAuth = async(req, res, next) => {
  const token = req.headers.token;

  if(!token){
    return res.status(401).json({ success: false, message: "Not authorized, access denied" });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || "dev_jwt_secret_change_me";
    const tokenDecode = jwt.verify(token, jwtSecret);

    if(tokenDecode.id){
      req.body.userId = tokenDecode.id;
    } else {
      return res.status(401).json({ success: false, message: "Not authorized, access denied" });
    }

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
