import ns from '../namespace'
import Fiber from 'fibers'

function countCollection(coll, query = {}) {
  let fiber = Fiber.current
  let total = 0
  coll.count(query, (err, count) => {
    total = count
    fiber.run()
  })
  Fiber.yield()
  return total
}

function findCollection(coll, query, start = 0, limit = 10000) {
  let fiber = Fiber.current
  let docs = [], error = null
  coll.find(query).skip(start).limit(limit).toArray((err, result) => {
    error = err
    docs = result
    fiber.run()
  })
  Fiber.yield()
  return {error, docs}
}

export default (app) => {

  const pageSize = 100

  app.get('/api/category/:category', (req, res) => {

    Fiber(() => {
    const category = req.params.category || 'all'
    const pageno = parseInt(req.query.pageno,10) || 0
    const start = pageno * pageSize,
          end = start + pageSize

    const query = category !== 'all' ? {category} : {}

    const total = countCollection(ns.collections.Books, query)
    const books = findCollection(ns.collections.Books, query, start, pageSize)
    if (books.error) {
      res.json({error: true, reason: books.error})
      return
    }

    res.json({
      category: req.params.category,
      page: pageno,
      pageSize: pageSize,
      found: books.docs.length,
      totalItems: total,
      totalPages: Math.ceil(total / pageSize),
      books:books.docs
    })

    /*
    const books = ns.collections.Books.find(query, (err, result) => {
      if (err) {
        res.json({error:true, reason:err})
        return
      }

      res.json({
        category: req.params.category,
        page: pageno,
        pageSize: pageSize,
        found: books.length,
        totalItems: total,
        totalPages: Math.ceil(total / pageSize),
        books:books
      })
    }).skip(start).limit(pageSize)
    */
    }).run()
  })
}
