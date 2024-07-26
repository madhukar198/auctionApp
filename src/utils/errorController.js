// module.exports = (err, req, res, next)=>{
//     console.error(err);
//     err.statusCode = err.statusCode ||500
//     err.status=  err.status || false

//     return res.status(err.statusCode).send({status:err.status, message:err.message})
// }
//------------
module.exports = (err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    const status = err.status || false;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: status,
        message: message
    });
};
