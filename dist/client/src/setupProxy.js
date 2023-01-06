var createProxyMiddleware = require('http-proxy-middleware').createProxyMiddleware;
module.exports = function (app) {
    app.use('/api', createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
    }));
};
