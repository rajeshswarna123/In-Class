const res = require("express/lib/response");

module.exports = {
    requireAuth(req, res, next){
        if(!req.user){
            next({status: 401, message: "Unauthorized"});
        }
        else{
            next();
        }
    }
}