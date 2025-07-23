const checkPermission = (providedPermission)=>{
    return function (req,res,next){
    const user = req.user;
    const {permissions} = user;
    if(!user && !permissions.includes(providedPermission)){
        res.status(403).send('Access Denied : Insufficient permission')
    }
    next();
    }
};

module.exports = checkPermission;