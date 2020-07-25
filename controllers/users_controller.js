const User=require('../models/user');

module.exports.profile = function(req, res){
    User.find({email:req.cookies.user_1},function(err,user){
        if(err){console.log("Error finding the user!")
    return res.redirect('back')}
        if(user.length>0){
            return res.render('user_profile', {
                title: 'User Profile',
                user:user[0]
            })
        }
        else{
            return res.redirect('/users/signin')
        }
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

module.exports.signout=function(req,res){
    res.cookie('user_1', {expires: Date.now()});
    return res.redirect('/users/signin')
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
    User.find({email:req.body.email},function(err,user){
        if(err){
            return console.log("Error finding the user!")
        }
        if(user.length===0){
            console.log('No user found!')
            return res.redirect('back')
        }
        if(user.length>=1){
            if(user[0].password != req.body.password){
                console.log('password mismatch!')
                return res.redirect('back')
            }
            res.cookie('user_1',user[0].email)
            console.log(req.cookies)
            return res.redirect('/users/profile')
        }
        
    })

}