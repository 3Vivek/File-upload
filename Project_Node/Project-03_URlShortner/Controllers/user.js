const User=require("../Model/user");
const {v4: uuidv4}=require("uuid")
const {setUser}=require("../Service/auth")

async function handleUserSignUp(req,res){
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.redirect("/");

}
async function handleUserLogin(req,res){
    const {email,password}=req.body;
    const userCred=await  User.findOne({email,password});
    if(!userCred){
        return res.render("login",{
            error:"Invalid user or Password",
        })
    }


    const token=setUser(userCred);
    //using JWT
    res.cookie("uid",token);
    return res.redirect("/");

    // using bearer token based
    // return  res.json([token])
}


module.exports={
    handleUserSignUp,handleUserLogin
}