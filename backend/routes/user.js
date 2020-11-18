const router = require('express').Router()
let UserAccount = require('../models/userAccount.model')
let UserAuths = require('../models/userAuths.model')

const getRandomToken = (len = 64) => {
    let token = '';
    while(token.length < len){
        token += Math.random().toString(36).substr(2, 100);
    }
    return token.substr(0, 64);
}

router.route('/').post((req, res) => {
    UserAccount.findOne({
        username: req.body.username,
        password: req.body.password
    })
        .then(
            user => {
                console.log(req.body.username)
                // console.log(user._id.getTimestamp())
                let response = {
                    authenticated: 'false',
                    error: 'The user or password doesn\'t match!'
                }
                if(user !== null) {
                    const token = getRandomToken();
                    const expireIn = 1800;
                    response = {
                        authenticated: 'true',
                        token: token,
                        expiresIn: expireIn,
                        username: req.body.username
                    }
                    const newUserAuths = new UserAuths({
                        userId: user._id,
                        username: req.body.username,
                        token: token,
                        logoutTime: new Date(new Date().getTime() + expireIn * 1000)
                    })
                    newUserAuths.save()
                        .then(() => {
                            //console.log('User auth!')
                        })
                        .catch(err => res.status(400).json('Error: ' + err))
                    // UserAuths.create({
                    //         userId: user._id,
                    //         username: req.body.username,
                    //         token: token,
                    //         logoutTime: new Date(new Date().getTime() + 1800 * 1000)
                    //     })
                    //     .then(() => console.log('User auth!'))
                    //     .catch(err => console.log('Error: ' + err));
                }
                res.json(response)
                // console.log(res)
                return response
            }
        )
        .then(
            resp => {
                console.log(resp)
            }
        )
        .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new UserAccount({
        username,
        password
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json())
});
router.route('/recover').post((req, res) => {
    UserAccount.findOne({
        username: req.body.username,
    })
        .then(
            user => {
            }
        )
        .then(
            resp => {
                console.log(resp)
            }
        )
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router
