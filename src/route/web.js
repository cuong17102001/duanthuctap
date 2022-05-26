import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/' , homeController.getHomePage);

    router.get('/add-employee',homeController.addEmployeePage)
    router.post('/add-employee-post',homeController.addEmployee)

    router.get('/login',homeController.loginPage )
    router.post('/post-login',homeController.login)

    router.get('/getss' , (req ,res) =>{
        return res.send(req.session.user)
    })


    router.get('/criteria-user' , homeController.criteriaUserPage)
    router.get('/criteria',homeController.criteriaPage)
    router.get('/add-criteria',homeController.addCriteriaPage)

    router.post('/add-criteria-post',homeController.addCriteria)
    router.post('/criteria-post',homeController.criteriaPost)


    router.get('/edit-employee' , homeController.editEmployeePage)
    router.post('/edit-employee-post' , homeController.editEmployee)
    router.get('/delete-employee' , homeController.deleteEmployee)
    router.get('/logout',homeController.logout)
    router.get('/edit-criteria',homeController.editCriteriaPage)
    router.get('/delete-criteria',homeController.deleteCriteria)
    router.post('/edit-criteria-post' , homeController.editCriteria)

    router.get('/ad',homeController.type)


    // router.get('/get-crud' , homeController.getCRUD);
    // router.post('/post-crud' , homeController.postCRUD);

    // router.post('/api/login',userController.handleLogin);

    // router.get('/api/get-all-user' , userController.handleGetAllUser);
    // router.post('/api/create-new-user', userController.handleCreateNewUser)
    // router.put('/api/edit-user', userController.handleEditUser)
    // router.delete('/api/delete-user', userController.handleDeleteUser)

    // router.get('/api/allcode',userController.getAllCode)

    return app.use("/" , router);
}

module.exports = initWebRoutes;