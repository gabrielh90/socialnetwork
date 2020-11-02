const router = require('express').Router()
let User = require('../models/user.model')

const getRandomNumber = () => {

}
router.route('/').get((req, res) => {
    User.find()
        .then(
            users => {
                const match = [
                    users.filter(
                        (user, index) => {
                            if(req.body.username === user.username && 
                                req.body.password === user.password){
                                    return user;
                                }
                            return null;
                        }
                    )
                ]
                console.log('Users: ' + match.length)
                if(match.length)
                res.json(match)
            }
        )
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({
        username,
        password
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json())
});

module.exports = router