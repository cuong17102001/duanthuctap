import express from "express";
import homeController from "../controllers/homeController";
import authenMiddleware from "../middleware/authentication"
import employeeController from "../controllers/employeeController"
import criteriaController from "../controllers/criteriaController"

let router = express.Router();

let initWebRoutes = (app) => {

    //trang quản lý
    router.get('/', authenMiddleware.RoleManage , employeeController.getHomePage);
    router.get('/totalpoint', authenMiddleware.RoleManage , employeeController.getTotalPoint);
    router.get('/criteria', authenMiddleware.RoleManage ,criteriaController.criteriaPage)
    router.get('/criteria-user', authenMiddleware.RoleManage , criteriaController.criteriaUserPage)
    router.get('/add-criteria',authenMiddleware.RoleManage,criteriaController.addCriteriaPage)

    // router.get()

    router.post('/edit-criteria-post',authenMiddleware.RoleManage , criteriaController.editCriteria)
    router.get('/edit-criteria',authenMiddleware.RoleManage,criteriaController.editCriteriaPage)

    router.get('/add-employee',authenMiddleware.RoleManage,employeeController.addEmployeePage)
    router.post('/add-employee-post',authenMiddleware.RoleManage,employeeController.addEmployee)

    
    router.get('/edit-employee',authenMiddleware.RoleManage , employeeController.editEmployeePage)
    router.post('/edit-employee-post',authenMiddleware.RoleManage , employeeController.editEmployee)
    router.get('/delete-employee',authenMiddleware.RoleManage , employeeController.deleteEmployee)

    
    router.post('/add-criteria-post',authenMiddleware.RoleManage,criteriaController.addCriteria)
    router.post('/criteria-post',authenMiddleware.RoleManage,criteriaController.criteriaPost)
    router.get('/delete-criteria',authenMiddleware.RoleManage, criteriaController.deleteCriteria)

    router.get('/delete-history' , authenMiddleware.RoleManage ,criteriaController.deleteReward )

    //trang nhân viên   

    router.get('/login',homeController.loginPage )
    router.post('/post-login',homeController.login)

    router.get('/logout',homeController.logout)
  

    router.get('/home' , homeController.getHomePageEmployee)
    return app.use("/" , router);
}

module.exports = initWebRoutes;