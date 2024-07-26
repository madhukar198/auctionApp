const AppError = require("../utils/appError")
const {validationResult} = require('express-validator');
const catchAsync = require("../utils/catchAsync")


module.exports = (req, res, next) => {
    console.log("req.body-->", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors==>",errors);
        let err = errors.array()
	    let errmssg = err.map(data=> data.msg)
        return next(new AppError(errmssg.join(', '), 400));
    }
    next();
};