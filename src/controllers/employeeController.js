import db from "../models/index";
const { Op } = require("sequelize");
import sequelize from "sequelize"

let getHomePage = async(req ,res)=>{
    let employee = await db.Employee.findAll({
        where:{
            role:1
        }
    })
    return res.render('homepage.ejs' , {employee})
}

let getTotalPoint = async(req ,res)=>{

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
    return res.render('employee.ejs' , {
        month:month,
        sort:sort,
        pointTotal:pointTotal,
        employee:employee
    })
}

let addEmployeePage = (req , res) =>{
    
    return res.render('addemployee.ejs')
    
    
}

let addEmployee = async (req , res) =>{
    let username = req.body.username
    let password = req.body.password
    let name = req.body.name
    let birth = req.body.date

    if (name !== "" && birth !== "" && username !== "" && password !== "") {
        let findUser = await db.Employee.findOne({
            where:{
                username:username
            }
        })

        if (findUser) {
            return res.redirect('/add-employee')
        }
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



module.exports = {
    getHomePage,
    getTotalPoint,
    addEmployeePage,
    addEmployee,
    editEmployeePage,
    editEmployee,
    deleteEmployee
}