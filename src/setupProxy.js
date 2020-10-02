const { createProxyMiddleware } = require('http-proxy-middleware')

const isCI = process.env.REACT_APP_ENVIRONMENT === 'CI'

APIS = [
  { endpoint: `/v2/filing`, target:  'http://localhost:8080' },
  { endpoint: `/v2/admin`,  target:  'http://localhost:8081' },
  { endpoint: `/v2/public`, target:  'http://localhost:9092' },
]

module.exports = function (app) {
  if (isCI) {
    APIS.forEach(({ endpoint, target }) => {
      app.use(
        endpoint,
        createProxyMiddleware({
          target,
          changeOrigin: true,
          pathRewrite: {
            '^/v2/filing': '/', // rerwrite to base path
            '^/v2/admin':  '/', // rerwrite to base path
            '^/v2/public': '/', // rerwrite to base path
          }
        })
      )
    })
  }
}