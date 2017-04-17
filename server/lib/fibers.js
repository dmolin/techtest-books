import Fiber from 'fibers'

/**
 * This function will ensure that our request handler run inside a Node Fiber
 * Say goodbye to callback hell!
 **/
export function runInFiber(handler) {
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

export function findOne(coll, query) {
  let fiber = Fiber.current
  let doc = null, error = null
  coll.findOne(query, (err, result) => {
    error = err
    doc = result
    fiber.run()
  })
  Fiber.yield()
  return {error, doc}
}

export function findCollection(coll, query, start = 0, limit = 10000, projection) {
  let fiber = Fiber.current
  let docs = [], error = null
  coll.find(query, projection).skip(start).limit(limit).toArray((err, result) => {
    error = err
    docs = result
    fiber.run()
  })
  Fiber.yield()
  return {error, docs}
}

export default {
  runInFiber,
  findOne,
  findCollection
};
