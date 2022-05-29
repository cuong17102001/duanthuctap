import db from "../models/index";

let criteriaPage = async(req , res)=>{
    let data = await db.Criteria.findAll()
    return res.render('criteria.ejs',{data:data});
}

let criteriaUserPage = async(req , res)=>{
    let id = req.query.id
    let user = await db.Employee.findOne({
        where:{
            id:id
        }
    })
   
    let type = await db.Criteria.findAll()

    let reward = await db.RewardPoints.findAll({
        where:{
            idEmployee:req.query.id
        },
    }) 

    console.log(reward);

    return res.render('criteriauser.ejs',{user:user , type:type , reward })
}

let addCriteriaPage = (req , res) =>{
   
    return res.render('addcriteria.ejs')
    
    
}

let editCriteria = async(req , res)=>{
    let id = req.body.id
    let name = req.body.name
    let point = req.body.point
    await db.Criteria.update({
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

let editCriteriaPage =async (req , res)=>{
    let id = req.query.id
    let criteria = await db.Criteria.findAll({
        where:{
            id : id
        }
    })
    return res.render('editcriteria.ejs' , {criteria})
}
let addCriteria = async(req , res)=>{
    let name = req.body.name
    let point = req.body.point
    await db.Criteria.create({
        name:name,
        point:point
    })
    
    return res.redirect('criteria')
}
let criteriaPost = async(req , res) =>{
    let iduser = req.body.iduser
    let type = req.body.type
    let date = req.body.date

    let criteria = await db.Criteria.findAll({
        where:{
            id:type
        }
    })

    let pointCriter = criteria[0].point

    await db.RewardPoints.create({
        idEmployee:iduser,
        idCriteria:type,
        point:pointCriter,
        date:date
    })

    return res.redirect('/')
}

let deleteCriteria = async(req , res)=>{
    let id = req.query.id
    await db.Criteria.destroy({
        where:{
            id:id
        }
    })
    return res.redirect('/criteria')
}

let deleteReward = async(req , res)=>{
    let id = req.query.id
    let iduser = req.query.iduser
    await db.RewardPoints.destroy({
        where:{
            id:id
        }
    })
    return res.redirect('/criteria-user?id='+iduser)
}

module.exports = {
    criteriaPage,
    criteriaUserPage,
    addCriteriaPage,
    editCriteria,
    editCriteriaPage,
    addCriteria,
    criteriaPost,
    deleteCriteria,
    deleteReward
    
}