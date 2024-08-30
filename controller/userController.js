const User = require('../models/User');
const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken');

exports.Register = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(401).json({
                success: false,
                messege: "user already exists",
                data: null
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);


        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
            role
        })

        await newUser.save();

        return res.status(201).json({
            success: true,
            messege: "User Registered Successfully",
            data: newUser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            messege: "internal Error",
            data: null
        })
    }
}


exports.Login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const checkUser = await User.findOne({email});

        if(!checkUser){
            return res.status(404).json({
                success: false,
                messege: "User not Found",
                data: null
            })
        }
         
        const comparepassword = await bcrypt.compare(
            password,checkUser.password
        )

        if(!comparepassword){
            return res.status(403).json({
                success: false,
                messege: "Invalid password",
                data: null
            })
        }

        const token = jwt.sign({id:checkUser._id}, process.env.jwt_secret)

        return res.status(200).json({
            success: true,
            messege: "User logged in Successfully",
            data: checkUser,
            token,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            messege: "internal Error",
            data: null
        })
    }
}