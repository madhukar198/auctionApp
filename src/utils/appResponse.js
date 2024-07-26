// module.exports = (res,msg, body)=>{
//     if(!body){
//         return res.status(200).send({status:true, message:msg})
//     }else{
//         return res.status(200).send({status:true, message:msg, response:body})
//     }
// }

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