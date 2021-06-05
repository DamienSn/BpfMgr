const express = require('express');
require('dotenv').config({path: './config/.env'});
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {checkUser, requireAuth} = require('./middlewares/auth.middleware');

const app = express();

const PORT = process.env.PORT || 3000;

// Convert body to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());


// jwt
app.get('*', checkUser);
app.get('/users/jwtid', requireAuth, (req, res) => {
    res.status(200).json({message: 'success', id: res.locals.user.id});
})

// routes
app.get('/', (req, res) => {
    res.json({'message': 'BpfMgr API v1'});
})

require('./routes/user.routes.js')(app);
require('./routes/cities.routes.js')(app);


// server
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
