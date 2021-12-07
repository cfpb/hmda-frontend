const PERIODS = ['Q3', 'Q2', 'Q1', 'annual']

function potentialYears(start = 2018) {
  let current = start < 2018 ? 2018 : start
  const output = []
  const maxYear = new Date().getFullYear() + 1

  while (current <= maxYear) {
    output.unshift(current)
    current++
  }
  return output
}

function parseTimedGuardDate(str, isDeadline = false) {
  let [month, day, year] = str.split('/').map((s) => parseInt(s, 10))
  month = month - 1 // Javascript months are 0 indexed

  // Determine time distance from Eastern Time zone
  let offset = new Date().getTimezoneOffset() / 60 - 5

  if (isDeadline) // Check against the "end of the day"
    return new Date(
      year,
      month,
      day,
      23 - offset, // 11:59pm ET
      59,
      59
    )

  // Check against the "start of the day"
  return new Date(
    year,
    month,
    day,
    0 - offset, // 12am ET
    0,
    0
  )
}

function formatLocalString(date) {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    day: 'numeric',
    month: 'long'
  })
}

// Determine 
export function deriveFilingPeriodStatus(baseConfig) {
  const config = JSON.parse(JSON.stringify(baseConfig))
  const timedGuards = config.timedGuards
  const now = Date.now()
  const dateIsDeadline = [false, true, true]

  config.filingPeriodStatus = {}

  potentialYears().forEach((year) => {
    PERIODS.forEach((period) => {
      if (!timedGuards[year][period]) return

      let periodString = `${year}`
      if (period.includes('Q'))
        periodString += `-${period}`

      // Parse timed guards
      const [startOfCollection, startOfLateFiling, collectionDeadline] = timedGuards[year][period]
        .split(' - ')
        .map((dateString, idx) => parseTimedGuardDate(dateString, dateIsDeadline[idx])
        )

      // Collect all pertinant info about the filing period
      config.filingPeriodStatus[periodString] = {
        period: periodString,
        startDate: formatLocalString(startOfCollection),
        lateDate: formatLocalString(startOfLateFiling),
        endDate: formatLocalString(collectionDeadline),
        isVisible: true,
      }

      if (period.includes('Q'))
        config.filingPeriodStatus[periodString].isQuarterly = true

      // Preview periods are considered "Open"
      if (timedGuards.preview.includes(periodString)) {
        config.filingPeriodStatus[periodString].isOpen = true
        return
      }

      // Set the filing period status based on timed guards
      if (now > collectionDeadline)
        config.filingPeriodStatus[periodString].isClosed = true
      else if (now > startOfLateFiling)
        config.filingPeriodStatus[periodString].isLate = true
      else if (now > startOfCollection)
        config.filingPeriodStatus[periodString].isOpen = true
      else {
        config.filingPeriodStatus[periodString].isClosed = true
        config.filingPeriodStatus[periodString].isVisible = false
      }
    })
  })

  return config
}
