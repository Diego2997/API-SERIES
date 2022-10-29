const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const UserSchema = new Schema({
   email:{type:String,required:true,lowercase:true,uniqued:true},
   password:{type:String,required:true},
   registerDate:{type:Date,default:Date.now()}
})

UserSchema.pre('save',(next)=>{
   let user = this

   bcrypt.genSalt(10,(error,salt)=>{
      bcrypt.hash(user.password,salt,null,(error,hash)=>{
         user.password = hash
         next()
      })
   })
})

UserSchema.method.comparePassword = (password) =>{
   let user = this
  return bcrypt.compareSync(password,user.password)
}
module.exports = mongoose.model('User', UserSchema)
// 1:09
