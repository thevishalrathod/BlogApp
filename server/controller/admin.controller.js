import '../models/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Post from '../models/Post.model.js';
import User from '../models/User.model.js';

const adminLayout = '../views/layouts/admin_layout';
const jwt_secret = 'MySecret';


/**
 * To render login page
 */
export const login_page = async (req, res)=>{
    const locals = {
        title:"Admin",
        description:"Simple blog app"
    }    
    try {
        res.render("admin/admin_login.ejs", {
            locals,
            layout:adminLayout
        });
    } catch (error) {
        console.log(error);
        
    }
};

/**
 * To render register page
 */
export const register_page = (req, res)=>{
    const locals = {
        title:"Admin",
        description:"Simple blog app"
    }    

    try {
        res.render('admin/admin_register', {
            locals,
            layout:adminLayout
        });
    } catch (error) {
        console.log(error);
        
    }
};

/**
 * To register user and insert user details in database
 */
export const register = async (req, res)=>{
    try {
        const locals = {
            title:"Registered",
            description:"Simple blog app"
        };
        const {username, password} = req.body
        // console.log(req.body)
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({username, password:hashedPassword}); 
            res.render('reg_success', {
                locals,
                layout:adminLayout
            });   
            // res.status(201).json({message:"User created", user});

        } catch (error) {
            if(error.code==11000)
                res.status(409).json({message:"User already in use"});

            res.status(500).json({message:"Internal server error"});
        }

    } catch (error) {
        console.log(error);
        
    }
};

/**
 * To make user loged in
 */
export const login = async (req, res)=>{
    try{
    const {username, password} = req.body;

    const user = await User.findOne({username});
    
    if(!user){
        return res.status(401).json({message:"Invalid credentials"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid credentials"});
    }

    const token = jwt.sign({userId:user._id}, jwt_secret);
    res.cookie("token", token, {httpOnly:true});
    res.redirect("/admin/dashboard");
    
    } catch(error){
        console.log(error);
    }
}

/**
 * To render dashboard 
 */
export const dashboard = async (req, res)=>{
    // authMiddleware();
    const locals={
        title:"Dashboard",
        description:"Simple blog app"
    };
    try {
        const data = await Post.find();

        res.render("admin/dashboard", {
            locals,
            data,
            layout:adminLayout
        });
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
};

export const add_post_page = async (req, res)=>{
    try {
        const locals = {
            title:"Add Post",
            description:"Simple blog app"
        };

        res.render("admin/add_post.ejs", {
            locals,
            layout:adminLayout
        });
    } catch (error) {
        console.log(error);
    }
};

export const add_post = async (req, res)=>{
    try {
        const newPost = new Post({
            title:req.body.title,
            body:req.body.body
        });
        await Post.create(newPost);
        res.redirect("/admin/dashboard");
    } catch (error) {
        
    }
};

export const edit_post_page = async (req, res)=>{
    try {
        const locals = {
            title:"Edit Post",
            description:"Simple blog"
        };
        const data = await Post.findOne({_id:req.params.id});

        res.render("admin/edit_post.ejs", {
            locals,
            data
        });

    } catch (error) {
        console.log(error);
    }
};

export const edit_post = async (req, res)=>{
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title:req.body.title,
            body:req.body.body,
            updatedAt:Date.now()
        });
        res.redirect("/admin/dashboard");
    } catch (error) {
        console.log(error);
    }
};

export const delete_post = async (req, res)=>{
    try {
        await Post.deleteOne({_id:req.params.id});
        res.redirect("/admin/dashboard");
    } catch (error) {
        console.log(error);
    }
};

export const logout = (req, res)=>{
    try {
        res.clearCookie('token');
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }

};