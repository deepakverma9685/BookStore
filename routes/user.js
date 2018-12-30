var express = require('express');
var router = express.Router();
var dbconnect = require('../database/db_config');
const bcrypt = require('bcrypt');



router.post('/register', function(req, res, next) {

    if (req.body.email ===''){
        res.json({
            status:0,
            message:'Please insert email'
        })
    }else if (req.body.fullname ===''){
        res.json({
            status:0,
            message:'Please insert fullname'
        })
    }else if (req.body.password ===''){
        res.json({
            status:0,
            message:'Please insert password'
        })
    }else if (req.body.school_name ===''){
        res.json({
            status:0,
            message:'Please insert school name;'
        })
    }else if (req.body.place ===''){
        res.json({
            status:0,
            message:'Please insert place'
        })
    }else if (req.body.class_name ===''){
        res.json({
            status:0,
            message:'Please insert Class'
        })
    }else if (req.body.class_id ===''){
        console.log(req.body.class_id);
        res.json({
            status:0,
            message:'Please insert Class id'
        })
    }else if (req.body.school_id ===''){
        res.json({
            status:0,
            message:'Please insert school id'
        })
    }else {

        var haspass = "";
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            // Store hash in database
            if(err){
                console.log(err)
            }else {
                console.log(hash);
                haspass = hash;
                var today = new Date();
                var data = {
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: haspass,
                    class_id:req.body.class_id,
                    school_id:req.body.school_id,
                    class_name:req.body.class_name,
                    school_name:req.body.school_name,
                    place:req.body.place,
                    created_at:today,
                    updated_at:today
                };

                var quer = 'INSERT INTO Users SET ?';
                dbconnect.query(quer,data, function (err,result){
                    if(err){
                        if (err.errno ===1062){
                            res.json({
                                status:0,
                                message:"Email already Exist!"
                            })
                        }else {
                            res.json({
                                status:0,
                                message:"Problem with query"
                            })
                        }
                    }else {
                        res.json({
                            status:1,
                            message:"Registered Successfully",
                            data:result
                        })
                    }
                });
            }
        });
    }
});

router.post('/login', function(req, res, next){
    if (req.body.email ===''){
        res.json({
            status:0,
            message:'Please insert email'
        })
    }else if (req.body.password ===''){
        res.json({
            status:0,
            message:'Please insert password'
        })
    }else {
        var quer = 'SELECT * FROM Users WHERE email = ?';
        dbconnect.query(quer,[req.body.email],function (err,result){
            if(err){
               throw err;
            }else {
                console.log(result[0].password);
                bcrypt.compare(req.body.password, result[0].password, function(err, resp) {
                    if(resp) {
                        res.json({
                            status:1,
                            message:'Logged in Succesfully',
                            data:result
                        })
                    } else {
                        res.json({
                            status:0,
                            message:'Password did not match'
                        })
                    }
                });
            }
        });
    }

});



module.exports = router;