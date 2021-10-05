export const badRequest = (error, request, response, next) => {
    console.log(`*********${error}`)
    if(error.status === 400 || error.name === "ValidationError"){
        response.status(400).send({message: error || "Not found"})
    } else{
        next(error)
    }
}

export const notFound = (error, request, response, next) => {
    console.log(error)
    if(error.status === 404){
        response.status(404).send({error: error.message || "Bad request, try again!"})
    } else {
        next(error)
    }
}

export const serverError = (error, request, response, next) => {
    console.log(`*********${error}`)
    response.status(500).send("Server generated error")
}