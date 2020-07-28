require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');

const userRoutes = require('./routes/user');
const credentialRoutes = require('./routes/credential');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/app/user', userRoutes);
app.use('/app', credentialRoutes);

const User = require('./models/user');
const Credential = require('./models/credential');

User.hasMany(Credential);
Credential.belongsTo(User);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server started at port 3000!!!');
    })
}).catch(err => {
    console.log(err);
})