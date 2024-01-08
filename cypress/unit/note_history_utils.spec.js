import * as util from '../../../src/institution/NoteHistory/utils'

const curr = {
  shallow: 'diff',
  nested: { value: 'diff' },
  array: [2, 1],
  newKey: 'diff',
}

const prev = { shallow: 'old', nested: { value: 'old' }, array: [1, 2] }

describe('#calcDiff', () => {
  it('Returns null when no differences', () => {
    expect(util.calcDiff(curr, curr)).to.equal(null)
    expect(util.calcDiff({}, {})).to.equal(null)
    expect(util.calcDiff(null, null)).to.equal(null)
  })

  it('Returns all diffs when one arg is null', () => {
    const res_no_prev = {
      shallow: { oldVal: null, newVal: 'diff' },
      nested: { value: { oldVal: null, newVal: 'diff' } },
      array: { oldVal: null, newVal: [2, 1] },
      newKey: { oldVal: null, newVal: 'diff' },
    }

    expect(util.calcDiff(curr, null)).to.deep.equal(res_no_prev)

    const res_no_curr = {
      shallow: { oldVal: null, newVal: 'diff' },
      nested: { value: { oldVal: null, newVal: 'diff' } },
      array: { oldVal: null, newVal: [2, 1] },
      newKey: { oldVal: null, newVal: 'diff' },
    }
    expect(util.calcDiff(null, curr)).to.deep.equal(res_no_curr)
  })

  it('Returns expected diff when given changed histories', () => {
    const expected = {
      shallow: { oldVal: 'old', newVal: 'diff' },
      nested: { value: { oldVal: 'old', newVal: 'diff' } },
      array: { oldVal: [1, 2], newVal: [2, 1] },
      newKey: { oldVal: null, newVal: 'diff' },
    }
    expect(util.calcDiff(curr, prev)).to.deep.equal(expected)
  })
})

describe('#allDiffs', () => {
  it('Returns null without fields to diff', () => {
    expect(util.allDiff()).to.equal(null)
    expect(util.allDiff({})).to.equal(null)
  })

  it('Treats all fields as changed', () => {
    const expected = {
      shallow: { oldVal: null, newVal: 'diff' },
      nested: { value: { oldVal: null, newVal: 'diff' } },
      array: { oldVal: null, newVal: [2, 1] },
      newKey: { oldVal: null, newVal: 'diff' },
    }
    expect(util.allDiff(curr)).to.deep.equal(expected)
  })
})

describe('#formatHistoryDate', () => {
  it('Formats valid history ID', () => {
    const hID = 'FRONTENDTESTBANK9999-2019-1597866055421'
    const expected = 'Wed Aug 19 2020'
    expect(util.formatHistoryDate(hID)).to.equal(expected)
  })

  it('Returns null for invalid history ID timestamp', () => {
    const hID = 'FRONTENDTESTBANK9999-2019-1597866055421-extra'
    expect(util.formatHistoryDate(hID)).to.equal(null)
  })
})

describe('#sortNotes', () => {
  it('Sorts notes desc by id', () => {
    const data = [{ id: 3 }, { id: 8 }]
    expect(data[0].id < data[1].id).to.equal(true)
    const sorted = util.sortNotes(data)
    expect(data[0].id < data[1].id).to.equal(false)
    expect(data[1].id < data[0].id).to.equal(true)
  })
})

describe('#addDiff', () => {
  it('Injects diff into notes', () => {
    const notes = [
      { updatedPanel: JSON.stringify(curr) },
      { updatedPanel: JSON.stringify(prev) },
    ]

    const injected = util.addDiff(notes)

    const expected = {
      shallow: { oldVal: 'old', newVal: 'diff' },
      nested: { value: { oldVal: 'old', newVal: 'diff' } },
      array: { oldVal: [1, 2], newVal: [2, 1] },
      newKey: { oldVal: null, newVal: 'diff' },
    }

    expect(injected[0].diff).to.deep.equal(expected)
  })
})
