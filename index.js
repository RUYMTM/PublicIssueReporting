const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(session({secret:'jihuzgtfgrhvjkiu87z65r4etfzgui897jiuhzgtfhgvjbkiozt786rz5tdhcgjvbkhiot7rf6udtcjgvhkbjlihz'}));
app.set('view engine', 'ejs');

require('./route/index')(app);

app.listen(3000, function () {
    console.log(`Express is running on port 3000`);
});
