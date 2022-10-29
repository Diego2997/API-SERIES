const User = require('../models/user')
const {authServices} = require('../services')

// ----------------CONSULTAR-------------------
const signIn = (req,res) =>{
    const { email,password } = req.body

    if(!email){
        return res.status(400).send({messsage:"el campo email es requerido"})
    }

    User.findOne({email} , (error,user) => {
        if(error){
            return res.status(500).send('se produjo un error' + error)
        }
        if(!user){
            res.status(404).send({message:"no se encontro un usuario con el email ingresado"})
        }
        if(!(password && user.comparePassword(password))){
            res.status(401).send({message:"El usuario o la clave son incorrectos"})
        }

        res.status(200).send({message:"Te has logueado correctamente",token: authServices.createToken(user)})
    })
}

// ---------CREAR---------------------------------
const signUp = (req,res) =>{
    const { email,password } = req.body

    User.findOne({email} , (error,user) => {
        if(error){
            return res.status(500).send('se produjo un error' + error)
        }
        if(user){
            res.status(400).send({message:"El email ya se encuentra en uso"})
        }
        // SI NO EXISTE EL USUARIO CON ESE EMAIL SE CREA UN NUEVO USUARIO
        const newUser = new User({email,password})

        //------------- GUARDAR EL USUARIO NUEVO------------------
        newUser.save((error)=>{
            if(error){
                return res.status(500).send('se produjo un error' + error)
            }
            res.status(200).send({message:"Te has registrado correctamente",token: authServices.createToken(newUser)})
        })
    })
}



const sayHi = (req,res) =>{
    //TODO
}

module.exports = {
    signIn,
    signUp,
    sayHi
}