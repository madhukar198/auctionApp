
module.exports = (res, msg, body = null) => {
    const responseData = {
        status: true,
        message: msg
    };
    if (body) {
        responseData.response = body;
    }

    return res.status(200).json(responseData);
};