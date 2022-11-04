const User = require('../models/user')
const { body, validationResult, check } = require("express-validator");


exports.sign_in_user_get = function(req,res,next){
    res.render('sign-up')
}

exports.sign_in_user_post = [
    // Validate and sanitize fields.
    body("username")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("First name must be specified.")
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters."),

    body("email").normalizeEmail().isEmail(),

    body('confirm_password')
        .custom((value, {req}) => (value === req.body.password))
        .withMessage("Passwords do not match"),
    // Process request after validation and sanitization.
    (req, res, next) => {
    // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('sign-up',{
            user:{
                username: req.body.username,
                email: req.body.email
            },
            errors: errors.array(),

            })
            return;
        }
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            // confirm_password: req.body.confirm_password
            
          })
        user.save(err => {
            if (err) { 
              return next(err);
            }
            res.redirect("/");
        });
    }
]


exports.log_in_user_get = [function(req,res,next){
    res.render('log-in')
}]
