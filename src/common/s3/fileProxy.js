export const IRS = {
  buildURL: (year, lei) => {
    return '/file/reports/irs/year/' + year + '/institution/' + lei
  },
}

export const MLAR = {
  buildURL: (year, lei, withHeader) => {
    let fileType = '/txt'
    if (withHeader) fileType += '/header'

    return `/file/modifiedLar/year/` + year + `/institution/` + lei + fileType
  },
}
