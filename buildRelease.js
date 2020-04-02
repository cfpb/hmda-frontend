const fs = require("fs")
const exec = require("child_process").exec
const releaseFilename = "./src/common/constants/release.json"

/*** Execute Update Process ***/
resolveVersion(process.argv[2])
  .then(version => updateReleaseFile(releaseFilename, version))
  .catch(error => console.log(error))

/*******************/
/***** METHODS *****/
/*******************/

/**
 * Use latest git tag if no version is provided
 * @param {String} version
 */
function resolveVersion(version) {
  return new Promise((resolve, reject) => {
    version ? resolve(version) : execCmd("git describe --tags", resolve, reject)
  })
}

/**
 * Execute system command and provide result to callback
 * @param {String} command
 * @param {Function} onSuccess
 * @param {Function} onError
 */
function execCmd(command, onSuccess, onError) {
  exec(command, function(error, stdout, stderr) {
    if (error) return onError(stderr)
    onSuccess(stdout.trim())
  })
}

/**
 * Persist release version
 * @param {String} fileName
 * @param {Object} fileData
 * @param {String} newVersion
 */
function updateReleaseFile(fileName, newVersion) {
  const fileData = require(fileName)
  fileData.version = formatVersion(newVersion)

  fs.writeFile(fileName, JSON.stringify(fileData, null, 2), function(err) {
    if (err) return console.log(err)
    console.log("Release version updated to " + fileData.version)
  })
}

/**
 * Apply version formatting(?) and validation(?)
 * @param {String} version
 */
function formatVersion(version) {
  if (version[0] !== "v") version = "v" + version
  return version
}
