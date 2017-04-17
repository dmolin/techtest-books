import ns from '../namespace'
import Fiber from 'fibers'
import { runInFiber, findOne } from '../lib/fibers'

function findBook (req, res) {
  const isbn = req.params.isbn;
  const book = findOne(ns.collections.Books, {
    isbn
  })
  if (book.error) {
    res.json({error: true, reason: book.error})
    return
  }

  res.json({
    isbn,
    book: book.doc
  });
}

export default (app) => {
  const findBookFiberized = runInFiber(findBook)
  app.get('/api/books/:isbn', findBookFiberized)
}
