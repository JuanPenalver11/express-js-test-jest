import bcrypt from 'bcrypt'

const saltRound = 10; 

// se establece la dificultad 

export const hashPassword = (password) =>{
    const salt = bcrypt.genSaltSync(saltRound)
    // se crea una cadena aleatoria 
    return bcrypt.hashSync(password, salt)
    // se combina la contrasegna con el salt 
}

export const comparePassword = (plain, hashed) =>{
    return bcrypt.compareSync(plain, hashed)
}