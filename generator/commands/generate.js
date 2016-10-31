import fs from 'fs'
import path from 'path'
import moment from 'moment'
import tingodb from 'tingodb'
import Fiber from 'fibers'

const Engine = tingodb()
const modes = (fs.constants || fs)
const genders = ["male", "female"]
const categories = [
  //"biography", "drama", "fantasy", "health", "history", "horror", "mistery", "romance", "scifi", "travel"
  "fantasy", "health", "history", "horror", "mistery", "romance", "scifi", "travel"
]

function rand(max = 100, min = 0) {
  //generate random number from min(inclusive) to max(exclusive)
  return Math.floor(Math.random() * (max - min))
}

function genCategory(category) {
  if (category) return category

  return categories[rand(categories.length)] 
}

function genGender() {
  return ['male','female'][rand(2)]
}

function genFirstname(gender = "male") {
  const male = ["David", "Paul", "Tony", "Richard", "Homer", "Walter", "Craig", "Samuel", "Peter"]
  const female = ["Ellen", "Sue", "Katherine", "Judit", "Christina", "Johanna", "Pam", "Yasmin", "Julia"]
  const names = { male, female }
  const source = names[gender] || names.male

  return source[rand(source.length)]
}

function genLastname() {
  const source = ["Hayward", "Roche", "Hashington", "Seller", "Mann", "Green", "Anderson", "Hutchinson", "Pearson", "Lloyd"]
  return source[rand(source.length)]
}

function genFullname(gender) {
  return genFirstname(gender) + " "  + genLastname()
}

function genPublishDate() {
  const from = moment('2000-01-01'),
        to = moment()

  return new moment(from).add(rand(to.diff(from, 'seconds')), 'seconds').format('YYYY-MM-DD')
}

function genAuthorImage(gender) {
  return `/images/author/${gender}/author-${rand(10) + 1}.jpg`
}

function genBookCover() {
  return `/images/books/book-${rand(10) + 1}.jpg`
}

function genTitle()
{
    const namearray= ["Tesla's","Chomsky's","Napoleon's","Milton's","Sherlock's","Matisse's","Mozart's","Virginia Woolf's","Vivaldi's","Schoenberg's","Freud's","Plato's","Sartre's","Karl Marx's","Voltaire's","Edison's","Proust's","Jane Eyre's","E M Forster's","Hardy's","Conrad's","Shakespeare's","Marie Curie's","Amelia Earhart's","Katherine Mansfield's","Ada Lovelace's", "Jane Austen's", "James Joyce's", "Ezra Pound's", "Tennyson's", "Wordsworth's", "John Donne's", "Blake's", "Dorothy Parker's", "Morrissey's", "Elvis's"];

    const thingarray= [" Rainbow"," Custard"," Breakfast"," Wardrobe", " Ukulele", " Underpants"," Bookcase"," Laundry"," Shopping List"," Antimacassar"," Amanuensis"," Aubergine"," Sandpit"," Holiday"," Teacake"," Bedpost"," Hatstand"," Inkwell"," Garden"," Bathtub"," Party"," Book Club"," Sofa"," Picnic"," Spectacles"," Telescope"," Window"," Kitchen", " Teapot", " Bedspread", " Toolbox", " Deckchair", " Sideboard", " Suitcase", " Teaspoon", " Treehouse", " Camera"];

    return namearray[rand(namearray.length)] + thingarray[rand(thingarray.length)];
}

function denodeify(cb) {
  return function() {
    const args = [].slice.call(arguments, 0)
    return new Promise((resolve, reject) => {
      if(err) reject(err)
      else resolve([].slice.call(arguments, 0)[1])
    })
  }
}

function writeBuffer(buffer, coll, db) {
  //return denodeify(coll.insert,bind(call))(buffer)
  var fiber = Fiber.current
  coll.insert(buffer, (err, doc) => {
    fiber.run()
  })
  Fiber.yield()
}

function countCollection(coll) {
  var fiber = Fiber.current
  coll.count((err,count) => {
    console.log("count", count)
    fiber.run(count)
  })
  Fiber.yield()
}

function generateBooksAndFiles(number) {
  const serverPath = path.join(__dirname, '../../server/db')
  const db = new Engine.Db(serverPath, {})

  fs.unlinkSync(path.join(__dirname, serverPath + '/books'))
  const Books = db.collection('books')

	console.log("Generating " + number + " books")
	
	//start generation process
  let buffer = []
  const ignored = [...Array(number).keys()].map(i => {
    const gender = genGender()
    const generated = {
      id: i,
      title: genTitle(),
      cover: genBookCover(),
      author: {
        name: genFullname(gender),
        gender: gender,
        image: genAuthorImage(gender)
      },
      category: genCategory(),
      publishDate: genPublishDate(),
      rating: rand(5)+1
    }

    buffer.push(generated)

    if(buffer.length >= 1000) {
      const ret = writeBuffer(buffer, Books, db)
      buffer = []
    }

  })

  if(buffer.length) {
    writeBuffer(buffer, Books, db)
    buffer = []
  }

  //read back all records
  console.log("Total records", countCollection(Books))

}

export default generateBooksAndFiles
