var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  res.render("index",currentUser);;
});

router.get('/sign-up', userController.sign_in_user_get);

router.post("/sign-up",userController.sign_in_user_post);

router.get('/log-in', userController.log_in_user_get);

router.post("/log-in",passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/"
}));


module.exports = router;
