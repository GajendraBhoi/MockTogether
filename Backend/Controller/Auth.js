const bcrypt = require('bcrypt');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Signup handler 
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                Message: 'All fields are required'
            });
        }

        // Duplicate user check
        const existingDbUser = await User.findOne({ email });
        if (existingDbUser) {
            return res.status(400).json({
                success: false,
                Message: 'User already exists'
            });
        }

        // Secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                Message: 'Error in hashing password',
            });
        }

        // Create user entry 
        await User.create({
            name, email, password: hashedPassword
        })

        return res.status(201).json({  // Changed to 201 for resource creation
            success: true,
            Message: 'User signed up successfully'
        });
    } catch (error) {
        console.error('Signup error:', error);  // Added logging
        return res.status(500).json({
            success: false,
            Message: 'Error in signing up'  // Corrected message
        });
    }
};

// Login handler
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic input validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                Message: 'Email and password are required'
            });
        }

        const existingDbUser = await User.findOne({ email });
        if (!existingDbUser) {
            return res.status(401).json({
                success: false,
                Message: 'Invalid credentials'  // Generic message for security
            });
        }

        // Verify password 
        if (await bcrypt.compare(password, existingDbUser.password)) {
            const payload = {
                email: existingDbUser.email,
                id: existingDbUser._id,
            }

            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });

            const userData = existingDbUser.toObject();
            delete userData.password;  // Safer than setting to undefined

            const options = {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',  // Added for security
                sameSite: 'Strict'  // Added for security
            }

            return res.cookie("token", token, options).status(200).json({
                success: true,
                user: userData,  // Better naming
                message: 'User logged in successfully'
            })
        } else {
            return res.status(401).json({  // Consistent 401 for auth failures
                success: false,
                Message: 'Invalid credentials'  // Generic message for security
            });
        }
    } catch (error) {
        console.error('Login error:', error);  // Added logging
        return res.status(500).json({
            success: false,
            Message: 'Internal server error'
        });
    }
}

// Validate token handler
exports.validateToken = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                valid: false,
                Message: 'Token not found'
            });
        }

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    valid: false,
                    Message: 'Invalid token'
                });
            }

            return res.status(200).json({
                valid: true,
                Message: 'Token is valid'
            });
        });
    } catch (error) {
        console.error('Token validation error:', error);  // Added logging
        return res.status(500).json({
            valid: false,
            Message: 'Error validating token'
        });
    }
};

// Logout handler
exports.logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });

        return res.status(200).json({
            success: true,
            Message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);  // Added logging
        return res.status(500).json({
            success: false,
            Message: 'Error logging out'
        });
    }
};