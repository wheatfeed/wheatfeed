function errorHandler (err, req, res, next) {
    console.log(err.name, '<<<< ini dari error handler');
    let statusCode = 500
    let errors = []

    switch(err.name) {
        case 'SequelizeValidationError':
            err.errors.forEach(element => {
                // console.log(element, '<<< ini error element');
                errors.push(element.message)
            });
            statusCode = 400
            break
        case 'JsonWebTokenError':
            errors.push('User not authenticated')
            statusCode = 401
            break
        default:
            errors.push(err.message)
            statusCode = err.statusCode || 500
    }

    return res.status(statusCode).json({errors})
}


module.exports = errorHandler