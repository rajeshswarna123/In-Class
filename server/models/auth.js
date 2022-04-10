const res = require("express/lib/response");

module.exports = {
    requireAuth(){
        if(!this.req.user){
            next({status: 401, message: "Unauthorized"});
        }
        else{
            next();
        }
    }
}