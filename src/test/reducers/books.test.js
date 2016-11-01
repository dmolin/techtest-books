import subject, {initialState} from '../../app/reducers/books'
import searchStarted from '../../app/actions/books/searchStarted'
import searchStopped from '../../app/actions/books/searchStopped'
import searchResult from '../../app/actions/books/searchResults'


describe('books reducer', () => {
  it('ACTION_BOOKS_SEARCH_STARTED', () => {
    const category = 'all', pageno = 3
    const action = searchStarted(category, pageno)
    const expectation = Object.assign({}, initialState, {category, pageno, loading:true})
    expect(subject(initialState, action)).to.eql(expectation)
  })

  it('ACTION_BOOKS_SEARCH_STOPPED', () => {
    const action = searchStopped()
    const expectation = Object.assign({}, initialState, {loading:false})
    expect(subject(initialState, action)).to.eql(expectation)
  })

  it('ACTION_BOOKS_SEARCH_RESULTS', () => {
    const category = 'horror', 
          result = {
            category: category,
            page: 2,
            pageSize: 100,
            found: 100,
            totalItems: 1000,
            books:[{_id:1, title:'test'}]
          }
    const action = searchResult(category, result)
    const expectation = Object.assign({}, initialState, {loading:false, category, pageno: result.page, result: result})
    expect(subject(initialState, action)).to.eql(expectation)
  })
})
