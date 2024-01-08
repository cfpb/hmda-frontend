const { createProxyMiddleware } = require('http-proxy-middleware')

const isCI = () => import.meta.env.VITE_ENVIRONMENT === 'CI'

APIS = [
  { endpoint: `/v2/filing/`, target: 'http://localhost:8080' }, // hmda-filing-api
  { endpoint: `/v2/admin/`, target: 'http://localhost:8081' }, // hmda-admin-api
  { endpoint: `/v2/public/uli/`, target: 'http://localhost:9091' }, // check-digit
  { endpoint: `/v2/public/`, target: 'http://localhost:8082' }, // hmda-public-api
  { endpoint: `/public/rateSpread`, target: 'http://localhost:9095' }, // ratespread-calculator
]

module.exports = function (app) {
  if (isCI()) {
    APIS.forEach(({ endpoint, target }) => {
      app.use(
        endpoint,
        createProxyMiddleware({
          target,
          changeOrigin: true,
          pathRewrite: {
            [endpoint]: endpoint.replace(/^(\/v2)?\/(admin|public|filing)/, ''),
          },
        }),
      )
    })
  }
}
