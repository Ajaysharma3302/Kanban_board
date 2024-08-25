const authorizemiddleware = (permittedroles)=>{
return(req,res,next)=>{
    const userRole = req.user.role
    if(permittedroles.includes(userRole)){
        next()
    }else{
        res.status(403).json({
            message:"Yor are not allowed to access this route"
        })
    }
}

}

module.exports = authorizemiddleware