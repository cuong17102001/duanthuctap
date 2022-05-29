import db from "../models/index";
const { Op } = require("sequelize");
import sequelize from "sequelize"
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

                    let type = await db.Criteria.findAll({
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
                let Criteria = await db.Criteria.findAll()

                let role = false
                if (user[0].role == 0) {
                    role = true
                }else{
                    role = false
                }
                return res.render('employee.ejs' , {employee: employee ,Criteria:Criteria , selectmonth: selectmonth , selectedmont: req.query.month, point_total : point_total , role : role} )
            } catch (error) {
                console.log(error);
            }
        }else{
            return res.redirect('/login')
        }
    
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

let type = async(req , res)=>{
    let user = await db.Criteria.findAll()
    return res.send(user)

}


let logout = (req , res) =>{
    req.session.destroy()
    return res.redirect('login')
}


let getHomePageEmployee = async(req , res)=>{
    let d = new Date();
    let monthnow = d.getMonth() + 1;
    let yearnow = d.getFullYear()


    let month = null;

    if(!req.query.month){
        month = monthnow
    }else{
        month = req.query.month

    }
    let sort = null;
    if(!req.query.sort){
        sort = "DESC"
    }else{
        sort = req.query.sort
    }


    console.log(sort);
    
    let employee = await db.Employee.findAll()

    let pointTotal = await db.RewardPoints.findAll({
        attributes:[
            'idEmployee',
            [sequelize.fn('SUM', sequelize.col('point')), 'total'], 
        ],
        where:{
            [Op.and]:[
                {
                    date : {
                        [Op.like]: '%_____'+month+'___%'
                    },
                },
                {
                    date : {
                        [Op.like]: '%'+yearnow+'______%'
                    },
                },
            ]
            

        },
        group: ["idEmployee"],
        order:[
            [sequelize.fn('SUM', sequelize.col('point')) , sort]
        ]
    })
    return res.render('homepageemployee.ejs' , {
        month:month,
        sort:sort,
        pointTotal:pointTotal,
        employee:employee
    })
}

module.exports = {
    getHomePage: getHomePage,
    loginPage:loginPage,
    login:login,
    type:type,
    logout,
    getHomePageEmployee
}