const express = require("express");
const passport = require("passport");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const GoogleStrategy = require("passport-google-oidc");
const userService = require("../../services/user.Services");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env["GOOGLE_CLIENT_ID"],
            clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
            callbackURL: "/user/oauth2/redirect/google",
            scope: ["profile", "email"],
        },
        async function verify(issuer, profile, cb) {
            //check if user exists in the database
            try {
                console.log(profile);
                const user = await processUser(
                    profile.displayName,
                    profile.id,
                    profile.name.givenName,
                    profile.name.familyName,
                    profile.emails[0].value,
                    profile.country ? profile.country : "",
                    profile.pincode ? profile.pincode : null,
                    profile.city ? profile.city : ""
                )

                if (user) {
                    console.log("result--", user);
                    return cb(null, user);
                }
                return cb(null, false);
            }
            catch (err) {
                console.log(err);
                return cb(err, null);
            };
          
        }
    )
);


router.get("/federated/google", passport.authenticate("google"));

router.get("/oauth2/redirect/google",passport.authenticate("google", {
        successRedirect: `https://${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_PORT}/user/home`,
        failureRedirect: `https://${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_PORT}/`,
    })
);

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { username: user.UserName });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
router.post("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

async function processUser(username,password,firstName,lastName,email,countryName,pincode,city) {
    try {
        const user = await userService.userExist(username, password);
        if (!user) {
           const newUser = await userService.createUser(
                username,
                password,
                firstName,
                lastName,
                email,
                countryName,
                pincode,
                city
            );           
            return newUser;
        }
        console.log(user);
        return user;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = router;
