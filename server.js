const express = require('express');
require('dotenv').config({path: './config/.env'});
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({'message': 'BpfMgr API v1'});
})

require('./routes/user.routes.js')(app);

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
