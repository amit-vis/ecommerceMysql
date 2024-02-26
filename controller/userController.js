const User = require('../model/user');
const jwt = require('jsonwebtoken');
const secure = require('../config/secure');

module.exports.create = async (req, res)=>{
    try {
        const getEmail = await User.findUser(req.body.email);
        if(getEmail && getEmail.length>0){
            return res.status(200).json({
                message: "User already exist",
                success: true,
                getEmail
            })
        }else{
            const newUser = await User.register(req.body);
            return res.status(200).json({
                message: "Register Successfully!",
                success: true,
                newUser
            })
        }
    } catch (error) {
        console.log("Error in registring the user", error);
        return res.status(500).json({
            message: "Error in registring the user",
            error
        })
    }
}

module.exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract user credentials from the request body
        const checkUser = await User.findPassUser(password, email);

        if (checkUser.length === 0) {
            return res.status(400).json({
                message: "Invalid User name or password!"
            });
        } else {
            const user = checkUser[0];
            console.log("It's working");
            return res.status(200).json({
                message: "Sign In Successfully!",
                success: true,
                data:{
                    token: jwt.sign({ id: user.id, email: user.email }, secure.secretKey, { expiresIn: '1h' })
                }
            });
        }
    } catch (error) {
        console.log("Error in user signed in", error);
        return res.status(500).json({
            message: "Error in user signed in",
            error
        });
    }
};