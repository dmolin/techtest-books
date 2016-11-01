import ns from '../namespace'
import Fiber from 'fibers'

/**
 * This function checks that the query parameters contain only allowed values
 * This is necessary by design, since we merely map query parameters to NoSQL where clauses :p
 **/
function sanitizeParams(params) {
  const allowedParams = ['category', 'author.gender', 'author.name', 'nofilter', 'title']
  /*
  Object.keys(params).forEach(k => {
    if (allowedParams.indexOf(k) === -1) {
      throw new Error('A not allowed query parameter was provided [' + k + ']')
    }
  })
  */
  return Object.keys(params).reduce((acc, k) => {
    if (allowedParams.indexOf(k) === -1) {
      //skip this parameter.
      return acc
    }
    acc[k] = params[k]
    return acc
  }, {})
}

/**
 * The query object is just a simple POJO containing key-value pairs.
 * We need to identify the fields that represents a free text search and convert their value
 * in a regex for the NoSQL store. This is for the upcoming free text search
 */
function mapFreeSearchFields(query) {
  const textFields = ['author.name', 'title']

  return Object.keys(query).reduce((acc, k) => {
    let val = query[k]

    if (textFields.indexOf(k) >= 0) {
      val = { $regex: `.*${val}.*` }
    }
    acc[k] = val
    return acc
  }, {})
}

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

  const sanitizedQueryParams = sanitizeParams(req.query)

  // for the sake of simplicity, all the query params are used as "AND" where clauses
  const whereClauses = mapFreeSearchFields(Object.assign({}, sanitizedQueryParams, (category !== 'all' ? {category} : {})))

  console.log("query", whereClauses)

  const total = countCollection(ns.collections.Books, whereClauses)
  const totalPages = Math.ceil(total / pageSize)

  //check that pageno is within bound. if not, fix it
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

/**
 * This function will ensure that our request handler run inside a Node Fiber
 * Say goodbye to callback hell!
 **/
function runInFiber(handler) {
  return ((req, res) => {
    Fiber(() => {
      try {
        handler(req, res)
      } catch (err) {
        res.json({error:true, reason: err.message})
      }
    }).run()
  })
}

export default (app) => {
  const findBooksFiberized = runInFiber(findBooks)

  app.get('/api/category/:category', findBooksFiberized)
  app.get('/api/category/:category/:pageno', findBooksFiberized)
}
