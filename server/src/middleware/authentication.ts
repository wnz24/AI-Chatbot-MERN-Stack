const jwt = require("jsonwebtoken")

export const createToken = (id: any, email: string, expiresIn:any)=>{
    const payload = {id, email}
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:expiresIn
    })
    return token;
}
