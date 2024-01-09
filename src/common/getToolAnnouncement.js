/**
 * Function is used inside React Class Components to parse out the toolAnnouncement messages from the config. These messages are for alerting users
 * when that particular tool is going to be down for maintenance
 * @param {String} toolName Used to parse the specific tool message
 * @param {Object} config Entire JSON config (i.e dev-config.json or prod-config.json)
 * @returns {Object} Returns the entire tool announcement message
 */

export const getToolAnnouncement = (toolName, config) => {
  if (!config?.toolAnnouncement) return

  for (let item of config?.toolAnnouncement) {
    if (item?.tool?.toLowerCase() === toolName?.toLowerCase()) {
      return item
    }
  }
}

export default {
  getToolAnnouncement,
}
