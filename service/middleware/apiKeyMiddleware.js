module.exports = function apiKeyMiddleware(req,res,next){
    if(process.env.ENABLE_API_KEY === "false"){
        return next();
    }

    const apikey = 
    req.headers["x-api-key"] ||
    req.query.apikey;

    if(!apikey){
        return res.status(401).json({
            success:false,
            message:"Api key missing"
        });
    }
    if (apiKey !== process.env.API_KEY){
        return res.status(403).json({
            success:"false",
            message:"Invalid Api key"
        })
    }
    next();
}