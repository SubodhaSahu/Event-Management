const express = require("express");
const path = require("path");
const fs = require('fs/promises');
const router = express.Router();

const users = [
    {
        "id" : 1,
        "name": "Subodha Sahu",
        "email": "subodha.sahu@mailinator.com",
        "password" : "12345"
    }
]

router.post("/login", async (req, res) => {
    let user = checkEmail(users, req.body.email);
    if (user) {
        if (req.body.password === user.password) {
            res.status(200).json({
                success: true,
                message: 'Login successful',
                user: user
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid Credential',
            });
        }
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid Email',
        });
    }
});



//Commented the code as vercel unable to read the file
/*const jsonFile = path.join(process.cwd(), 'json') + '/users.json';

router.post("/login", async (req, res) => {
    fs.readFile(jsonFile)
        .then((data) => {
            let users = JSON.parse(data);
            let user = checkEmail(users, req.body.email); 
            if (user) {
                if (req.body.password === user.password) {
                    res.status(200).json({
                        success: true,
                        message: 'Login successful',
                        user : user
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        message: 'Invalid Credential',
                    });
                }
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Invalid Email',
                });
            }
            
    })
    .catch((error) => {
        res.json(error)    
    });  
});*/

const checkEmail = (users, email) => {
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (user) return user;
};

module.exports = router;
