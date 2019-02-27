
// @ts-ignore  Må ha pga react https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development
const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://localhost/' }));
    app.use(proxy('/socket', { target: 'ws://localhost:8000/socket.io' , ws:true}));
};
