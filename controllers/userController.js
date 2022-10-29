const User = require('../models/user')

// ----------------CONSULTAR-------------------
const signIn = (req,res) =>{
    const { email } = req.body

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

        res.status(200).send({message:"Te has logueado correctamente",token:""})
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
        })
        res.status(200).send({message:"Te has registrado correctamente",token:""})
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