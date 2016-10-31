import path from 'path'
import dbDriver from 'tingodb'
import collections from './collections'
const Engine = dbDriver()

export default (ns) => {
  // Initialize NoSQL Database
  ns.db = new Engine.Db(path.join(__dirname, 'db'), {cacheSize: 10000})

  // Load collections
  ns.collections = collections(ns.db)
}
