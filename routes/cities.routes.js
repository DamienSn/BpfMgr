const CitiesController = require('../controllers/cities.controller');

module.exports = app => {
    app.get('/cities/all', CitiesController.getAll);

    // Get one city (Post datas to get);
    app.post('/cities/', CitiesController.getOne);
}