module.exports = app => {
    const users = require('../controllers/user.controller.js');

    app.post('/users/create', users.create);

    app.get('/users/all', users.getAll);

    app.delete('/users/delete/:id', users.delete);

    app.get('/users/connect', users.connect);

    app.put('/users/update/:id', users.update);

    app.get('/users/:id', users.getOne);

}