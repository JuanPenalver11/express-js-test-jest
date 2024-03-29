import passport from "passport";
import { comparePassword } from "../bcrypt/encrypted-password.mjs";
import { LocalUserModel } from "../moongose/localUserSchema/localUserModel.mjs";
import { Strategy } from "passport-local";

passport.serializeUser((user, done)=>{
    done(null,user.id)
});

passport.deserializeUser( async (id, done)=>{
    try{
        const findUser = await LocalUserModel.findById(id)
        if(!findUser) throw new Error('User not found');
        done(null, findUser)
    }catch(err){
        done(err, null)
    } 
});

export default passport.use(new Strategy( async (username, password, done)=>{
    try{
        const findUser = await LocalUserModel.findOne({username})
        if(!findUser) throw new Error('User not found');
        if(!comparePassword(password, findUser.password)) throw new Error('Invalid Password')
        done(null, findUser)
    }catch(err){
        done(err, null)
    }
}))