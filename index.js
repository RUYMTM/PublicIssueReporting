const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passwordHash = require("./config/passwordHash");

const UserModel = require('./model/user');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(session({secret: 'jihuzgtfgrhvjkiu87z65r4etfzgui897jiuhzgtfhgvjbkiozt786rz5tdhcgjvbkhiot7rf6udtcjgvhkbjlihz'}));
app.set('view engine', 'ejs');

require('./route/index')(app);

app.listen(3000, function () {
    UserModel.findOne({email: "admin"}, (err, user) => {
        if (err || !user) {
            const admin = new UserModel()
            admin.email = "admin"
            admin.lastname = "Doe"
            admin.firstname = "John"
            admin.password = passwordHash.generate("admin01")
            admin.save(err => {
                if (err) {
                    console.log(`Express is running on port 3000`);
                }
            });
        }
        console.log(`Express is running on port 3000`);
    });
});