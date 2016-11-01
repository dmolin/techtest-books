import subject, {api} from '../../app/utils/booksApi'

describe('utils/booksApi', () => {
  beforeEach(() => {
    sinon.stub(api, "get")
  })

  afterEach(() => {
    api.get.restore()
  })

  it('exposes a findByCategory() method', () => {
    expect(subject.findBooksByCategory).to.exist
  })

  it('convert the input parameters into a suitable http query string', () => {
    const category = 'horror',
          pageno = 1,
          query = {
            'author.gender': 'male'
          }

    subject.findBooksByCategory(category, pageno, query)
    expect(api.get).to.have.been.calledWith('/category/horror/1?author.gender=male')
  }) 

})
