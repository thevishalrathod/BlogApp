import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';

const jwt_secret = 'MySecret';

//To link admin controllers
import * as adminController from '../controller/admin.controller.js';

const authMiddleware = (req, res, next)=>{
    // console.log(req.cookies.token);
    const token = req.cookies.token;
    if(!token)
        return res.status(401).json({message:"Unauthorized"});
    try {
        const decoded = jwt.verify(token, jwt_secret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"});
    }
}

router.get("/login_page", adminController.login_page);
router.get("/register_page", adminController.register_page);
router.post("/register", adminController.register);
router.post("/login", adminController.login);
router.get("/dashboard", authMiddleware, adminController.dashboard);
router.get("/add_post_page", authMiddleware, adminController.add_post_page);
router.post("/add-post", authMiddleware, adminController.add_post);
router.get("/edit-post-page/:id", authMiddleware, adminController.edit_post_page);
router.put("/edit-post/:id", authMiddleware, adminController.edit_post);
router.delete("/delete-post/:id", authMiddleware, adminController.delete_post);
router.get("/logout", adminController.logout);

export default router;