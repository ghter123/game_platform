const Login = require('./login');
const Routers = require('../../middleware/router/router');

Routers.register('c2s_login', Login.login);

module.exports = Routers.router;
