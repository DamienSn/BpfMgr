const User = require('./user.model');

test('user model test', () => {
    return User.connectWithLicence({email: "damienstephan07@gmail.com", licence: "801549"}).then(data => {
        expect(data).toBe('incorrect licence id');
      });
})