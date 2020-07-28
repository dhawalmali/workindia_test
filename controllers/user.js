const CryptoJS = require('crypto-js');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({
        where: {
            username: username
        }
    });
    if (user) {
        return res.status(409).json({
            status: 'Account with given username already exists'
        });
    } else {
        const cipherPassword = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();
        const result = await User.create({
            username: username,
            password: cipherPassword
        });
        res.status(200).json({
            status: 'account created'
        });
    }
}

exports.login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({
        where: {
            username: username
        }
    });
    if (!user) {
        res.status(404).json({
            'status': 'Account not found'
        });
    } else {
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (originalPassword != password) {
            return res.status(401).json({
                status: 'unauthorized'
            });
        } else {
            return res.status(200).json({
                status: 'success',
                userId: user.userId
            });
        }
    }
}