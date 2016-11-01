export default (db) => {
  const Books = db.collection('books')
  Books.createIndex({category:1, 'author.gender':1})
  return Books
}
