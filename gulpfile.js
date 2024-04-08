/**
 * Import uswds-compile
 */
const uswds = require('@uswds/compile')

/**
 * USWDS version
 * Set the major version of USWDS you're using
 * (Current options are the numbers 2 or 3)
 */
uswds.settings.version = 3

/**
 * Path settings
 * Set as many as you need
 */
uswds.paths.dist.css = './src/common/uswds/css'
uswds.paths.dist.theme = './src/common/uswds/scss'
uswds.paths.dist.img = './src/common/uswds/img'
uswds.paths.dist.fonts = './src/common/uswds/fonts'
uswds.paths.dist.js = './src/common/uswds/js'
/**
 * Exports
 * Add as many as you need
 */
exports.init = uswds.init
exports.compile = uswds.compile
exports.watch = uswds.watch
