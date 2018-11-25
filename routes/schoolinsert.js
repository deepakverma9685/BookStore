var express = require('express');
var router = express.Router();
var dbconnect = require('../database/db_config');

/* GET users listing. */
router.get('/', function(req, res, next) {
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




module.exports = router;