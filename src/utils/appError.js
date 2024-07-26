class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = false;
        this.isOptional = true;
        console.log("error log this--->", this);
        Error.captureStackTrace(this, this.constructor);
    };
};
module.exports = AppError;