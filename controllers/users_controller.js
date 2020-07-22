const User=require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}


module.exports.signup=function(req,res){
        return res.render('user_sign_up',{
            title:"Sign Up"
        })
}

module.exports.signin=function(req,res){
    console.log(req.cookies)
        return res.render('user_sign_in',{
            title:"Sign In"
        })
}

module.exports.create=function(req,res){
        if (req.body.password != req.body.confirm_password){
            return res.redirect('back')
        }
        User.findOne({email:req.body.email},function(err,user){
            if(err){return console.log('error finding the user email')}
            if(!user){
                User.create(req.body,function(err,user){
                    if(err){return console.log('Error creating the user!')}
                    return res.redirect('/users/signin')
                })
            }
            else{
                return res.redirect('back');
            }
        })
}

module.exports.createSession=function(req,res){
    //TOTO
}