import fs from 'fs'
import path from 'path'
import moment from 'moment'
import tingodb from 'tingodb'
import Fiber from 'fibers'

const Engine = tingodb()
const db = new Engine.Db(path.join(__dirname, '../../server/db'), {})

function countCollection(coll) {
  const Coll = db.collection(coll)
  let total = 0
  var fiber = Fiber.current
  Coll.count((err,count) => {
    console.log("count", count)
    total = count
    fiber.run()
  })
  Fiber.yield()
  return total
}

export default () => (countCollection('books'))
