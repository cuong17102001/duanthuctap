let RoleManage = (req , res , next)=>{
    let user = req.session.user
        // && user[0].role == 0
    if (user) {
        if (user[0].role == 0) {
            next()
        }else{
            return res.redirect("/home")
        }
    }else{
        return res.redirect("/login")
    }
    
}

module.exports = {
    RoleManage
}