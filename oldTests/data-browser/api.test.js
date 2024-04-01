import {
  addVariableParams,
  addYears,
  createItemQuerystring,
  makeUrl,
  makeFilersUrl,
  runFetch,
  makeCSVName,
  getSubsetDetails,
  getCSV,
  getItemCSV,
  getSubsetCSV,
} from '../../src/data-browser/api.js'

it('adds variable params from an object', () => {
  expect(
    addVariableParams({ variables: { a: { 1: 123 }, b: { 2: 223 } } }),
  ).toBe('&a=1&b=2')
})

it('returns empty string on bad object', () => {
  expect(addVariableParams({})).toBe('')
})

it('adds years to an empty url', () => {
  expect(addYears()).toBe('?years=2018')
})

it('adds years to an existing qs', () => {
  expect(addYears('cool.com/a?b=c')).toBe('&years=2018')
})

it('creates a qs with items', () => {
  const qs = createItemQuerystring({ items: ['a', 'b'], category: 'c' })
  expect(qs).toBe('?c=a,b')
})

it('creates a qs with category only', () => {
  const qs = createItemQuerystring({ category: 'a', items: [] })
  expect(qs).toBe('')
})

it('creates an empty item qs', () => {
  const qs = createItemQuerystring()
  expect(qs).toBe('')
})

it('creates a qs with for nationwide', () => {
  const qs = createItemQuerystring({
    items: ['a', 'b'],
    category: 'nationwide',
  })
  expect(qs).toBe('')
})

it('makes a url', () => {
  const url = makeUrl({
    category: 'abc',
    items: ['1', '2', '3'],
    variables: { a: { b: 123 } },
  })
  expect(url).toBe(
    '/v2/data-browser-api/view/aggregations?abc=1,2,3&a=b&years=2018',
  )
})

it('bails making a url on bad item input', () => {
  const url = makeUrl({ variables: { a: { b: 123 } } })
  expect(url).toBe('')
})

it('bails making a url on bad obj', () => {
  const url = makeUrl()
  expect(url).toBe('')
})

it('makes a csv url', () => {
  const url = makeUrl({ category: 'a', items: ['b'] }, true)
  expect(url).toBe('/v2/data-browser-api/view/csv?a=b&years=2018')
})

it('makes a csv url for LEIs when nationwide', () => {
  const url = makeUrl({ category: 'nationwide', leis: ['b'] }, true)
  expect(url).toBe('/v2/data-browser-api/view/csv?leis=b&years=2018')
})

it('makes a csv url for LEIs when nationwide with variables', () => {
  const opts = {
    category: 'nationwide',
    leis: ['b'],
    variables: { a: { b: 123 } },
  }
  const url = makeUrl(opts, true)
  expect(url).toBe('/v2/data-browser-api/view/csv?leis=b&a=b&years=2018')
})

it('runs the fetch', (done) => {
  window.fetch = jest.fn((url, options) => {
    return Promise.resolve({
      status: 200,
      json: () => {
        return { url, options }
      },
    })
  })
  runFetch('argle').then((data) => {
    expect(data.url).toBe('argle')
    expect(data.options.method).toBe('GET')
    expect(data.options.headers.Accept).toBe('application/json')
    done()
  })
})

it('throws on bad http res', (done) => {
  window.fetch = jest.fn((url, options) => {
    return Promise.resolve({ status: 400 })
  })
  runFetch('argle').catch((data) => {
    expect(data.status).toBe(400)
    done()
  })
})

it('makes CSV name', () => {
  const csv = makeCSVName({ items: ['a', 'b'], variables: { c: { d: 123 } } })
  expect(csv).toBe('a,b-c.csv')
})

it('makes CSV name without vars', () => {
  const csv = makeCSVName(
    { items: ['a', 'b'], variables: { c: { d: 123 } } },
    false,
  )
  expect(csv).toBe('a,b.csv')
})

it('makes empty CSV name', () => {
  const csv = makeCSVName()
  expect(csv).toBe('')
})

it('makes nationwide CSV name', () => {
  const csv = makeCSVName({ category: 'nationwide', items: [] })
  expect(csv).toBe('nationwide.csv')
})

it('makes LEIs CSV name for nationwide + leis', () => {
  const csv = makeCSVName({
    category: 'nationwide',
    leis: ['a', 'b'],
    items: [],
  })
  expect(csv).toBe('leis-a,b.csv')
})

it('calls runFetch and makeUrl on getSubsetDetails', (done) => {
  window.fetch = jest.fn((url, options) => {
    return Promise.resolve({
      status: 200,
      json: () => {
        return { url, options }
      },
    })
  })

  getSubsetDetails({
    category: 'states',
    items: ['abc'],
    variables: { a: { b: 123 } },
  }).then((data) => {
    expect(data.url).toBe(
      '/v2/data-browser-api/view/aggregations?states=abc&a=b&years=2018',
    )
    done()
  })
})

it('creates an a element and adds and removes it from the DOM', () => {
  const setAttribute = jest.fn()
  const click = jest.fn()
  const cE = jest.fn((el) => ({ style: {}, setAttribute, click }))
  const aC = jest.fn()
  const rC = jest.fn()
  window.document.createElement = cE
  window.document.body.appendChild = aC
  window.document.body.removeChild = rC

  getCSV('abc', 'def')
  expect(cE.mock.calls.length).toBe(1)
  expect(aC.mock.calls.length).toBe(1)
  expect(rC.mock.calls.length).toBe(1)
  expect(setAttribute.mock.calls.length).toBe(2)
  expect(click.mock.calls.length).toBe(1)
})

it('calls getCSV on makeURL and makeCSVName on getItemCSV call, preventing variable inclusion', () => {
  const setAttribute = jest.fn()
  const click = jest.fn()
  const a = { style: {}, setAttribute, click }
  const cE = jest.fn((el) => a)
  const aC = jest.fn()
  const rC = jest.fn()
  window.document.createElement = cE
  window.document.body.appendChild = aC
  window.document.body.removeChild = rC

  getItemCSV({
    category: 'states',
    items: ['abc'],
    variables: { a: { b: 123 } },
  })
  expect(setAttribute.mock.calls[1][1]).toBe('abc.csv')
  expect(a.href).toBe('/v2/data-browser-api/view/csv?states=abc&years=2018')
})

it('calls getCSV on makeURL and makeCSVName on getSubsetCSV call', () => {
  const setAttribute = jest.fn()
  const click = jest.fn()
  const a = { style: {}, setAttribute, click }
  const cE = jest.fn((el) => a)
  const aC = jest.fn()
  const rC = jest.fn()
  window.document.createElement = cE
  window.document.body.appendChild = aC
  window.document.body.removeChild = rC

  getSubsetCSV({
    category: 'states',
    items: ['abc'],
    variables: { a: { b: 123 } },
  })

  expect(setAttribute.mock.calls[1][1]).toBe('abc-a.csv')
  expect(a.href).toBe('/v2/data-browser-api/view/csv?states=abc&a=b&years=2018')
})

describe('makeFilersUrl', () => {
  it('request all for nationwide', () => {
    expect(makeFilersUrl({ category: 'nationwide' })).toBe(
      '/v2/data-browser-api/view/filers?years=2018',
    )
  })

  it('request geo-specific for non-nationwide', () => {
    expect(makeFilersUrl({ category: 'states', items: ['CA', 'WA'] })).toBe(
      '/v2/data-browser-api/view/filers?states=CA,WA&years=2018',
    )
  })
})
