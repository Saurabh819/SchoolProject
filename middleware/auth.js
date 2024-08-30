const jwt = require('jsonwebtoken');

const auth = async (req,res,next)=>{
    const token = req.header("Authorization")?.split(" ")[1];

    if(!token){
        return res.status(403).json({
            success: false,
            messege: "not authorisez",
            data: null
        })
    }

    try {
        const decode = jwt.verify(token,process.nextTick.jwt_secret);
        req.user = decode;
        next()
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            messege: "Invalid Token",
            data: null
        })
    }
}