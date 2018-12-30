var school = require('../models/school');

const create = async function(req, res){
    const body = req.body;
    console.log("body   "+body);

    school.create(req.body)
        .then(user => res.json(user))
/*
    if(!body.school_name && !body.city_name){
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new user.', user:user.toWeb(), token:user.getJWT()}, 201);
    }*/
}
module.exports.create = create;

const get = async function(req, res){
    return   school.findAll().then(school => res.json(school));
}
module.exports.get = get;
