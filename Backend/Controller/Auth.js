const bcrypt = require('bcrypt');
const User = require('../Models/User'); // to interact with db 
const jwt = require('jsonwebtoken');
require('dotenv').config();


// signup handler 
exports.signup = async (req, res) => {
    try {
        // getting data 
        const { name, email, password } = req.body;

        // duplicate user check
        const existingDbUser = await User.findOne({ email });
        if (existingDbUser) {
            return res.status(400).json({
                success: false,
                Message: 'User already exists'
            });
        }

        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                Message: 'error in hashing password',
            });
        }

        // create user entry 
        const createdUser = await User.create({
            name, email, password: hashedPassword
        })

        return res.status(200).json({
            success: true,
            Message: 'User signed up successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            Message: 'error in signing in'
        });
    }
};


// login 
exports.login = async (req, res) => {
    try {
        // fetch data 
        const { email, password } = req.body;

        // TODO : please add data validation on client side ?????????????

        let existingDbUser = await User.findOne({ email });
        if (!existingDbUser) {
            return res.status(401).json({
                success: false,
                Message: 'email does not exists'
            });
        }


        // verify password 
        if (await bcrypt.compare(password, existingDbUser.password)) {
            // we will create a JWT Token **** IMP

            const payload = {
                email: existingDbUser.email,
                id: existingDbUser._id,

            }

            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });


            // we will send it to client in a cookie 
            existingDbUser = existingDbUser.toObject();
            existingDbUser.password = undefined;
            existingDbUser.token = token;

            const options = {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true, // can not access it on client side 
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                existingDbUser,
                message: 'User Logged in successfully '
            })
        }
        else {
            return res.status(403).json({
                success: false,
                Message: 'Incorrect Password'
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            Message: 'Error in logging in'
        });
    }
}