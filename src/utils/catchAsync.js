module.exports = (fs)=>{

    return(req, res,next)=>{
        fs(req, res,next).then(()=>{}).catch(err => next(err))
    }
}