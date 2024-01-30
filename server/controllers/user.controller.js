const User = require('../models/user.model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
secret_key = 'sssddsfdssdfdsf'
module.exports.login = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });

    if (user === null) {
        // email not found in users collection
        return res.status(400).json({
            message: "User not found "
        });
    }
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
        // password wasn't a match!
        return res.status(400).json({
            message: "Invalid password"
        });
    }

    // if we made it this far, the password was correct
    const token = jwt.sign({
        id: user._id
    }, secret_key, {
        expiresIn: "2h"
    });

    // note that the response object allows chained calls to cookie and json
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2
    })
    return res.json({
        msg: "success!",
        user: user,
        token: token
    });
}

module.exports.register = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        const token = jwt.sign({
            id: newUser._id
        }, secret_key, {
            expiresIn: "2h"
        });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 2
        })
        return res.json({
            msg: "success!",
            user: newUser,
            token: token
        });
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie('token').sendStatus(200).json({
        message: "Succesfully logged out!"
    });
}