const CryptoJS = require('crypto-js');
const User = require('../models/user');
const Credential = require('../models/credential');

exports.getCredentials = async (req, res, next) => {
    const userId = req.query.user;
    const credentials = await Credential.findAll({
        where: {
            userUserId: userId
        }
    })
    credentials.map(cred => {
        const bytes = CryptoJS.AES.decrypt(cred.password, process.env.SECRET);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        cred.password = originalPassword;
        return cred;
    });
    res.status(200).json(credentials);
}

exports.addCredentials = async (req, res, next) => {
    const website = req.body.website;
    const username = req.body.username;
    const password = req.body.password;
    const userId = req.query.user;
    const user = await User.findOne({
        where: {
            userId: userId
        }
    });
    if (!user) {
        res.status(404).json({
            status: 'User with given id does not exist'
        });
    } else {
        const cipherPassword = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();
        const result = await user.createCredential({
            username: username,
            website: website,
            password: cipherPassword
        });
        res.status(200).json({
            status: 'success'
        });
    }
}