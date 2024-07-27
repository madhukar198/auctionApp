
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
