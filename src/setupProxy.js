const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/manage', {
    target: 'http://127.0.0.1:5555/chat',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/manage": "/"
    },
  }));
};
