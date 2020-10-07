const { createProxyMiddleware } = require('http-proxy-middleware')

const isCI = () => process.env.REACT_APP_ENVIRONMENT === 'CI'

APIS = [
  { endpoint: `/v2/filing/`, target:  'http://localhost:8080' },
  { endpoint: `/v2/admin/`,  target:  'http://localhost:8081' },
  // Issue: Calls to `/v2/public` seem to be hitting the Platform API 
  //       instead of Institutions API, resulting in errors on both
  //       the front and back (Platform) ends.  
  // Workaround:
  //        Explicitly fetching from http://localhost:9092, 
  //        instead of relying on this proxy, seems to work.   
  // Todo:
  //        Find a way to make this routing config work for the 
  //        Institutions API so that everything is config'd in one
  //        location.
  // { endpoint: `/v2/public/`, target:  'http://localhost:9092' },
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