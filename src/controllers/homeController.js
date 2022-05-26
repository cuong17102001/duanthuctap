import db from "../models/index";
import CRUDService from "../services/CRUDService"
const { Op } = require("sequelize");

let getHomePage = async (req, res) =>{

        let user = req.session.user
        // && user[0].role == 0
        if (user) {
            try {

                
                let selectmonth = false
                let rewardpoints = []
                let month = ""
                if (!req.query.month) {
                    let today = new Date()
                    let monthnow = today.getMonth()+1

                    let so = monthnow+""
                    
                    if (so.length === 1) {
                        month = "0" + monthnow
                    }else{
                        month = monthnow + ""
                    }
                    selectmonth =  true

                }
                else{
                    let so = req.query.month+""
                    if (so.length === 1) {
                        month = "0" + req.query.month
                    }else{
                        month = req.query.month + ""
                    }
                     
        
                    selectmonth =  false
                    
                }
                rewardpoints = await db.RewardPoints.findAll({
                    where : {
                        date : {
                            [Op.like]: '%_____'+month+'___%'
                        }
                    }
                })

                let point_total = {}
                for (let index = 0; index < rewardpoints.length; index++) {

                    let type = await db.PointType.findAll({
                        where:{
                            id : rewardpoints[index].idType
                        }
                    })

                    if (!point_total[rewardpoints[index].idEmployee] ) {
                        point_total[rewardpoints[index].idEmployee] = type[0].point
                    }else{
                        point_total[rewardpoints[index].idEmployee] += type[0].point
                    }

                    
                }

                let employee = await db.Employee.findAll({
                    where: {
                        role:1
                    }
                });
                let pointType = await db.PointType.findAll()

                let role = false
                if (user[0].role == 0) {
                    role = true
                }else{
                    role = false
                }
                return res.render('employee.ejs' , {employee: employee ,pointType:pointType , selectmonth: selectmonth , selectedmont: req.query.month, point_total : point_total , role : role} )
            } catch (error) {
                console.log(error);
            }
        }else{
            return res.redirect('/login')
        }
    
}

let addEmployeePage = (req , res) =>{
    let user = req.session.user
    if (user && user[0].role == 0) {
        return res.render('addemployee.ejs')
    }else{
        return res.redirect('/login')
    }
    
}

let addEmployee = async (req , res) =>{
    let username = req.body.username
    let password = req.body.password
    let name = req.body.name
    let birth = req.body.date

    if (name !== "" && birth !== "" && username !== "" && password !== "") {
        await db.Employee.create({
            username:username,
            password:password,
            name : name,
            date : birth,
            role:1
        })
    }
    return res.redirect('/');
}

let loginPage = (req , res)=>{
   
        return res.render('login.ejs')
  
}


let login = async (req , res)=>{
    let username = req.body.username
    let password = req.body.password

    let user = await db.Employee.findAll({
        where: {
            username: username,
            password:password
        }
       
    })
    if(user.length !== 0){
        req.session.user = user
        return res.redirect('/')
    }else{
        req.session.user = []
        return res.redirect('/login')
    }
}


let criteriaUserPage = async(req , res) =>{

    let id = req.query.id
    let user = await db.Employee.findOne({
        where:{
            id:id
        }
    })

    let Reward = await db.RewardPoints.findAll({
        where:{
            idEmployee:id
        },
        order : [
            ['id' , 'DESC']
        ]
    })


    let history = []
    for (let index = 0; index < Reward.length; index++) {
        let point = await db.PointType.findOne({
            where:{
                id : Reward[index].idType
            }
        })
        history[index] = point
    }

    console.log(history);

    let type = await db.PointType.findAll()

    return res.render('criteriauser.ejs',{user:user , type:type , history})
}

let criteriaPage = async(req , res) =>{
    let user = req.session.user
    if (user && user[0].role == 0) {
        let data = await db.PointType.findAll()
        return res.render('criteria.ejs',{data:data});
    }else{
        return res.redirect('/login')
    }
    
}


let addCriteriaPage = (req , res) =>{
    let user = req.session.user
    if (user && user[0].role == 0) {
        return res.render('addcriteria.ejs')
    }else{
        return res.redirect('/login')
    }
    
}


let criteriaPost = async(req , res) =>{
    let iduser = req.body.iduser
    let type = req.body.type
    let date = req.body.date

    await db.RewardPoints.create({
        idEmployee:iduser,
        idType:type,
        date:date
    })

    return res.redirect('/')
}


let type = async(req , res)=>{
    let user = await db.PointType.findAll()
    return res.send(user)

}



let addCriteria = async(req , res)=>{
    let name = req.body.name
    let point = req.body.point
    await db.PointType.create({
        name:name,
        point:point
    })
    
    return res.redirect('criteria')
}

let logout = (req , res) =>{
    req.session.destroy()
    return res.redirect('login')
}

let editEmployeePage = async(req , res)=>{
    let iduer = req.query.id
    let user = await db.Employee.findAll({
        where:{
            id:iduer
        }
    })

    return res.render('editemployee.ejs', {user:user})
}


let editEmployee = async(req , res) =>{
    let iduser = req.body.isuser

    await db.Employee.update({
        name : req.body.name,
        date:req.body.date
    },
    {
        where:{
            id:iduser
        },
        
    })
    return res.redirect('/')
}


let deleteEmployee = async (req , res) =>{
    let id = req.query.id
    let deleteuser = await db.Employee.destroy({
        where:{
            id:id
        }
    })
    if(deleteuser){
        await db.RewardPoints.destroy({
            where:{
                idEmployee: id
            }
        })
    }
    return res.redirect('/')
}


let editCriteriaPage =async (req , res)=>{
    let id = req.query.id
    let criteria = await db.PointType.findAll({
        where:{
            id : id
        }
    })
    return res.render('editcriteria.ejs' , {criteria})
}

let deleteCriteria = async(req , res)=>{
    let id = req.query.id
    let deletecriteria = await db.PointType.destroy({
        where:{
            id:id
        }
    })
    if(deletecriteria){
        await db.RewardPoints.destroy({
            where:{
                idType: id
            }
        })
    }

    return res.redirect('/criteria')
}


let editCriteria = async(req , res)=>{
    let id = req.body.id
    let name = req.body.name
    let point = req.body.point
    await db.PointType.update({
        name : name,
        point
    },
    {
        where:{
            id:id
        },
        
    })
    return res.redirect('/criteria')
}

let getCRUD = (req , res)=>{
    return res.render('CRUD.ejs');
}

let postCRUD = async (req , res) =>{
    await CRUDService.createNewUser(req.body);
    return res.send('hello')
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD:postCRUD,
    addEmployeePage:addEmployeePage,
    addEmployee:addEmployee,
    loginPage:loginPage,
    login:login,
    type:type,
    criteriaUserPage,
    criteriaPage,
    addCriteriaPage
    ,addCriteria,
    criteriaPost,
    editEmployeePage,
    editEmployee,
    deleteEmployee,logout,
    editCriteriaPage,
    deleteCriteria,
    editCriteria
}