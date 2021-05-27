module.exports = app => {
    const users = require('../controllers/user.controller.js');
    const authController = require('../controllers/auth.controller.js');

    app.post('/users/create', users.create);

    app.get('/users/all', users.getAll);

    app.delete('/users/delete/:id', users.delete);

    // auth
    app.post('/users/login', authController.logIn);
    app.post('/users/logout', authController.logOut)

    app.put('/users/update/:id', users.update);

    app.get('/users/:id', users.getOne);

}