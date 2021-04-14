const ErrorResponse = require('./../utils/errorResponse');
const colors = require('colors');
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    console.log(err);
    //Mongoose bad ObjectId
    if(err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if(err.code === 11000) {
        console.log(err.message)
        const message = 'Duplicate field value entered'; // Or The email already exists
        error = new ErrorResponse(message, 400);
    }
    let fields;
    // Mongoose validation error
    console.log(err.name)
    if(err.name === 'ValidationError') {
        const message = err.name;
        fields = Object.values(err.errors).map(val => {return {[val.path]:  val.message}});
        error = new ErrorResponse(message, 400, fields);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: { 
            name: error.message || 'Server Error',
            description: error.description || undefined
        }
    })
};

module.exports = errorHandler;
