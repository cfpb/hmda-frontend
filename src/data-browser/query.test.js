import {
  formatParam,
  stringifyIfTruthy,
  makeParam,
  isInvalidKey,
  sanitizeArray,
  makeStateFromSearch,
  makeSearchFromState
} from './query.js'

it('formats a k/v pair for a querystring', () => {
  expect(formatParam('a','b')).toBe('a=b')
})

it('stringifies a truthy piece of state', () => {
  expect(stringifyIfTruthy({a:'b'}, 'a')).toBe('a=b')
})

it('stringifies a truthy piece of state when a non-empty array', () => {
  expect(stringifyIfTruthy({a:['b', 'c']}, 'a')).toBe('a=b,c')
})

it('returns empty string on empty array', () => {
  expect(stringifyIfTruthy({a:[]}, 'a')).toBe('')
})

it('returns empty string falsy val', () => {
  expect(stringifyIfTruthy({b:'c'}, 'a')).toBe('')
})

it('makes param from state', () => {
  expect(makeParam({a:'b'}, 'a')).toBe('a=b')
})

it('makes details param from state when present', () => {
  expect(makeParam({details: {a:'b'}}, 'details')).toBe('getDetails=1')
})

it('makes details param from state when absent', () => {
  expect(makeParam({details: {}}, 'details')).toBe('')
})

it('makes variables param from state', () => {
  expect(makeParam({variables: {a: {b: 123, bb: 1123}, c: {d: 234}}, orderedVariables: ['a', 'c']}, 'variables'))
    .toBe('a=b,bb&c=d')
})

it('makes variables param from state when unmatched length', () => {
  expect(makeParam({variables: {a:{b: 123}}, orderedVariables: []}, 'variables')).toBe('')
})

it('tests a valid Key', () => {
  expect(isInvalidKey('a', {a:123})).toBe(false)
})

it('tests an invalid Key', () => {
  expect(isInvalidKey('b', {a:123})).toBe(true)
})

it('tests a valid variable', () => {
  expect(isInvalidKey('actions_taken', {a:123})).toBe(false)
})

it('tests getDetails', () => {
  expect(isInvalidKey('getDetails', {a:123})).toBe(false)
})

it('sanitizes an array for state keys', () => {
  expect(sanitizeArray('states', ['XZ', 'CA'])).toEqual(['CA'])
})

it('sanitizes an array for msamd keys', () => {
  expect(sanitizeArray('msamds', ['123123123', '99999'])).toEqual(['99999'])
})

it('sanitizes an array for var keys', () => {
  expect(sanitizeArray('actions_taken', ['2', '44'])).toEqual(['2'])
})


it('sanitizes an array, allowing empty string', () => {
  expect(sanitizeArray('actions_taken', ['2', '', '44'])).toEqual(['2', ''])
})

it('no longer sanatizes an array for lei keys', () => {
  expect(
    sanitizeArray('leis', ['549300T1F1BRPWSZT586', '549300T1F1BRPWSZT58'])
  ).toEqual(['549300T1F1BRPWSZT586', '549300T1F1BRPWSZT58'])
})

it('makes state from search', () => {
  const state = makeStateFromSearch('?category=states&items=CA', {items: [], category: ''})
  expect(state).toEqual({category:'states', items:['CA']})
})

it('regenerates search on invalid key', done => {
  const regen = jest.fn()
  makeStateFromSearch('?states=CA', {}, null, regen)
  setTimeout(() => {
    expect(regen.mock.calls.length).toBe(1)
    done()
  },1)
})

it('regenerates search when array gets sanitized', done => {
  const regen = jest.fn()
  const state = makeStateFromSearch('?category=states&items=CA,XZ', {category: '', items:[]}, null, regen)
  setTimeout(() => {
    expect(state).toEqual({category:'states', items:['CA']})
    expect(regen.mock.calls.length).toBe(1)
    done()
  },1)
})

it('makes search with variables', () => {
  const regen = jest.fn()
  const state = makeStateFromSearch('?category=states&items=CA,XZ&actions_taken=2,3&loan_types=', {category: '', items:[], variables:{}, orderedVariables: []}, null, regen)
  expect(state).toEqual({category:'states', items: ['CA'], orderedVariables: ['actions_taken', 'loan_types'], variables:{'actions_taken': {2: true, 3: true}, 'loan_types': {}}})
})

it('calls detailsCb when getDetails is present', done => {
  const detailsCb = jest.fn()
  const state = makeStateFromSearch('?category=states&items=CA&getDetails=1', {category:'', items: []}, detailsCb)
   setTimeout(() => {
    expect(state).toEqual({category:'states', items:['CA']})
    expect(detailsCb.mock.calls.length).toBe(1)
    done()
  },1)
})

it('makes search from state', () => {
  const search = makeSearchFromState({category: 'states', items:['CA'], details:{a:'b'}, variables:{}, orderedVariables: []})
  expect(search).toBe('?category=states&items=CA&getDetails=1')
})

it('makes empty search from state', () => {
  const search = makeSearchFromState({items:[], details:{}, variables:{}, orderedVariables: []})
  expect(search).toBe('')
})
