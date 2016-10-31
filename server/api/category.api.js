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

function findBooks(req, res) {
  const pageSize = 100
  const category = req.params.category || 'all'
  let pageno = parseInt(req.params.pageno,10) || 0

  // for the sake of simplicity, all the query params are used as "AND" where clauses
  const whereClauses = Object.assign({}, req.query, (category !== 'all' ? {category} : {}))

  console.log("whereClauses", whereClauses)

  //const query = category !== 'all' ? {category} : {}

  const total = countCollection(ns.collections.Books, whereClauses)
  const totalPages = Math.ceil(total / pageSize)

  //check that pageno is within bound. if not, change it
  pageno = Math.min(pageno, totalPages-1)

  const start = pageno * pageSize,
        end = start + pageSize

  const books = findCollection(ns.collections.Books, whereClauses, start, pageSize)
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
}

function runInFiber(handler) {
  return ((req, res) => {
    Fiber(() => {
      handler(req, res)
    }).run()
  })
}

export default (app) => {
  const findBooksFiberized = runInFiber(findBooks)

  app.get('/api/category/:category', findBooksFiberized)
  app.get('/api/category/:category/:pageno', findBooksFiberized)
}
