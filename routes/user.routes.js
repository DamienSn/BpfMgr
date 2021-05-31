module.exports = app => {
    const users = require('../controllers/user.controller.js');
    const authController = require('../controllers/auth.controller.js');
    const uploadController = require('../controllers/upload.controller');
    const multer = require('multer');
    const upload = multer();

    app.post('/users/create', users.create);

    app.get('/users/all', users.getAll);

    app.delete('/users/delete/:id', users.delete);

    // auth
    app.post('/users/login', authController.logIn);
    app.post('/users/logout', authController.logOut)

    app.put('/users/update/:id', users.update);

    // photo
    app.post('/users/upload', upload.single('file'), uploadController.uploadProfil);

    app.get('/users/:id', users.getOne);

}