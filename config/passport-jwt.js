// code for authenticate the some section which have sensitive details of the user
const passport = require('passport');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTStratergy = require('passport-jwt').Strategy;
const User = require('../model/user')
const secure = require('./secure');

// here we have extract our jwt Bearer token and also created the secret key
const opts={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secure.secretKey
}

// here we have use our passport to use JWTStratergy to authenticate the user
passport.use(new JWTStratergy(opts, async (jwt_payload, done)=>{
    try {
        const user = await User.findById(jwt_payload._id);
        if(user){
            return done(null, user)
        }else{
            return done(null, false)
        }
    } catch (error) {
        console.log("Error in finding the user in passport", error);
        return done(error, false)
    }
}));

module.exports = passport;