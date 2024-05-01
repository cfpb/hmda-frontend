jest.unmock('./hasHttpError.js')
import hasHttpError from '../../../src/filing/actions/hasHttpError.js'

describe('hasHttpError', () => {
  it('checks for http errors', (done) => {
    hasHttpError().then((hasError) => expect(hasError).toBe(true))
    hasHttpError({ status: 401 }).then((hasError) => done.fail('401 resolves'))
    hasHttpError({}).then((hasError) => expect(hasError).toBe(false))
    hasHttpError({ status: 200 }).then((hasError) =>
      expect(hasError).toBe(false),
    )
    done()
  })
})
