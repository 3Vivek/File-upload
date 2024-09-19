//Diary h jaha sbka mapping ho rkha h

// const sessionIdToUserMap=new Map(); //for statefull management
const jwt=require("jsonwebtoken"); // for stateless management
const secret="Vivek@6972";

function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
    },secret)
}

function  getUser(token){
    if(!token) return  null;
    try {
        return jwt.verify(token,secret);
    }catch (error){
        return  null;
    }
}

module.exports={
    setUser,getUser
}