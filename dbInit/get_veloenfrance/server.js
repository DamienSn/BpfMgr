const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function write(data) {
    data = JSON.stringify(data);
    fs.writeFile('data.geojson', data, (err) => {
        if (err) {
            throw err;
        }
    });
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post('/post', (req, res) => {
    console.log(req)
    write(req.body);
    res.status(200).json({message: 'ok'});
})

app.listen(3000, () => {
    console.log('App listening at port 3000');
})