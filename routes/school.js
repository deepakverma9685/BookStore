var express = require('express');
var router = express.Router();
var dbconnect = require('../database/db_config');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('schools');
});


router.post('/post', function (req, res, nex) {

    var today = new Date();

    var insert_schools = {
        "school_name": req.body.school_name,
        "city_name": req.body.city_name,
        "created_at": today,
        "updated_at": today
    };

    if (insert_schools != null) {

        dbconnect.query('INSERT INTO Schools SET ?', insert_schools, function (error, results) {
            if (error) {
                console.log(error);
                /* res.json({
                     status:true,
                     message:'there are some error with query'
                 })*/
            } else {
                console.log(results);
                var get_last_id = results.insertId;
                var results = "";
                dbconnect.query('SELECT * FROM Schools WHERE id = ?', [get_last_id], function (error, results) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(results);
                        res.redirect('/thank')
                    }
                });

            }
        })
    }
});

router.get('/school_class', function (req, res) {
    var clas ;
    var schoool;
    get_class(function (result) {
        if (result) {
            clas = result;
            console.log(result);
            get_schools(function (school) {
                if (school) {
                    schoool = school;
                    console.log(school);

                    if (clas.length > 0 && schoool.length > 0) {
                        res.json({
                            status: 1,
                            message: 'Success',
                            class_name:clas,
                            school_name:schoool
                        })
                    }else {
                        res.json({
                            status: 0,
                            message: 'there are some error with query'
                        })
                    }
                } else {
                    schoool = [];
                }
            });
        } else {
            clas = [];
        }
    });

});

function get_schools(callback) {
    var school_query = 'SELECT * FROM Schools';
    dbconnect.query(school_query, function (error, results) {
        if (error) {
            callback(results)
        } else {
            callback(results);
        }
    });
}

function get_class(callback) {
    var class_query = 'SELECT * FROM Classes';
    dbconnect.query(class_query, function (error, results) {
        if (error) {
            callback(results)
        } else {
            callback(results)
        }
    })
}

module.exports = router;