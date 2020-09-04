function errorHandler (err, req, res, next) {
    console.log(err.name, '<<<< ini dari error handler');
    res.status(500).json({err}) //debugging
    let statusCode = 500
    let errors = []

    switch(err.name) {
        case 'SequelizeValidationError':
        case "SequelizeUniqueConstraintError":
            err.errors.forEach(element => {
                // console.log(element, '<<< ini error element');
                errors.push(element.message)
            });
            statusCode = 400
            break
        case 'JsonWebTokenError':
            switch(err.message){
                case "jwt malformed":
                case "invalid token":
                    errors.push('User not authenticated')
                    statusCode = 401
                    break;
                case "jwt must be provided":
                    errors.push("user need to login")
                    statusCode = 401
                    break;
              }
        default:
            errors.push(err.message)
            statusCode = err.statusCode || 500
    }

    return res.status(statusCode).json({errors})
}


module.exports = errorHandler