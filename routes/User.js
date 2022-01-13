const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.post("/", function(req, res){
    userController.login
})
router.post("/", function (req, res) {
  userController.signup;
});

//for logged in only

router.use(authController.protect)

router.delete('/banMe', userController.banMe)

//Only admins have access to this 

router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers)

router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser)

module.exports = router