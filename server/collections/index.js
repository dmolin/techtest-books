export default (db) => {
  return {
    Books: require('./books').default(db)
  }
} 
