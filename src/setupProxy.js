const { createProxyMiddleware } = require('http-proxy-middleware')

const isCI = () => process.env.REACT_APP_ENVIRONMENT === 'CI'

APIS = [
  { endpoint: `/v2/filing/`, target:  'http://localhost:8080' },
  { endpoint: `/v2/admin/`,  target:  'http://localhost:8081' },
  { endpoint: `/v2/public/`, target:  'http://localhost:8282' },
]

module.exports = function (app) {
  if (isCI()) {
    APIS.forEach(({ endpoint, target }) => {
      app.use(
        endpoint,
        createProxyMiddleware({
          target,
          changeOrigin: true,
          pathRewrite: { [endpoint]: '/' },
        })
      )
    })
  }
}