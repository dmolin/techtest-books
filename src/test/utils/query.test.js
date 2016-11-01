import {buildQueryString, pruneEmptyParams} from '../../app/utils/query'

describe('utils/query', () => {
  describe('buildQueryParams()', () => {
    it('returns an empty string if no input is provided', () => {
      expect(buildQueryString()).to.equal('')
      expect(buildQueryString({})).to.equal('')
    })

    it('returns a stringified version of the object suitable to be used as URL query string', () => {
      const query = {
        'author.gender': 'female',
        title: 'Telescope'
      }

      const result = buildQueryString(query)
      //the order of the keys is unpredictable, so I'll try both variants
      let found = 0
      try { expect(result).to.equal('?author.gender=female&title=Telescope'); found++ } catch (safetyNet) {}
      try { expect(result).to.equal('?title=Telescope&author.gender=female'); found++ } catch (safetyNet) {}
      expect(found).to.equal(1)
    })
  })

  describe('pruneEmptyParams(query)', () => {
    it('returns an empty object if no value is provided', () => {
      expect(pruneEmptyParams()).to.eql({})

      const query = {
        title: '',
        test:'data'
      }
      expect(pruneEmptyParams(query)).to.eql({test:'data'})
    })
  })
})
