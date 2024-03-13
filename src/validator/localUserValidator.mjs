export const localUserValidator = {
    
    username:{
        isString:{
            errorMessage:"Just String"
        },
        noEmpty:{
            errorMessage:"username cannot be empty"
        }
    },
    password:{
        isLength:{
            options:{min: 5},
            errorMessage: "Minimum length 5 characters"
        },
        noEmpty:{
            errorMessage:"password cannot be empty"
        }
    }
}