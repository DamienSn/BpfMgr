const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({'message': 'BpfMgr API v1'});
})

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
