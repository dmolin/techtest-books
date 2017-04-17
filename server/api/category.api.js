import ns from '../namespace'
import Fiber from 'fibers'
import { runInFiber, findCollection } from '../lib/fibers'

/**
 * This function checks that the query parameters contain only allowed values
 * This is necessary by design, since we merely map query parameters to NoSQL where clauses :p
 **/
function sanitizeParams(params) {
  const allowedParams = ['category', 'author.gender', 'author.name', 'nofilter', 'title']
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

  const books = findCollection(ns.collections.Books, whereClauses, start, pageSize, {description: 0})
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

export default (app) => {
  const findBooksFiberized = runInFiber(findBooks)

  app.get('/api/category/:category', findBooksFiberized)
  app.get('/api/category/:category/:pageno', findBooksFiberized)
}
