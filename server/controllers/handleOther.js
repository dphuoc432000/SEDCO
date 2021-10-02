const errorHandling = (description, errorObject)=>{
    return {
        errors:{
            object_return: null,
            description,
            errorObject
        }
    }
}

module.exports = {errorHandling};