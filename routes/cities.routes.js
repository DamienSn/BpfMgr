const CitiesController = require('../controllers/cities.controller');

module.exports = app => {
    app.get('/cities/all', CitiesController.getAll);
    app.post('/cities/');
}