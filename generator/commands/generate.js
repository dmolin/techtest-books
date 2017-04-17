import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import moment from 'moment'
import tingodb from 'tingodb'
import Fiber from 'fibers'

const Engine = tingodb()
const modes = (fs.constants || fs)
const categories = [
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

function genDescription () {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed mattis metus. Ut a tempor est. Praesent id lorem risus. Ut facilisis eros at nibh suscipit pellentesque non id lorem. Suspendisse ligula lacus, auctor id pretium ut, euismod sed massa. Quisque id eros commodo, pulvinar tortor eget, faucibus purus. Nulla molestie ultricies tincidunt.

Nulla facilisi. Nam euismod dui sit amet augue dignissim aliquet. Cras ac mauris eget dolor faucibus consectetur eget sit amet purus. Vestibulum et mi a dolor aliquam scelerisque. Nunc eu nulla lacinia augue tempus porta ac vitae erat. Pellentesque et odio pretium, tempus risus et, posuere nunc. Sed a massa placerat, scelerisque augue vel, eleifend enim. Nam quis hendrerit dui, id pellentesque urna. Sed condimentum pellentesque quam vitae feugiat. Nunc suscipit congue sodales. Duis finibus metus ut nisi imperdiet posuere. Vivamus tellus eros, congue sed neque sit amet, eleifend euismod sapien. Duis vel libero vel ex suscipit viverra ac vel purus. Nam vel ligula tincidunt, vestibulum sapien ac, ultricies quam.

Nunc id placerat augue. Praesent quis ipsum ut eros posuere finibus id rhoncus odio. Pellentesque vel egestas sem. Fusce leo turpis, cursus sed fringilla et, elementum et ipsum. Vestibulum et sem rhoncus purus fringilla eleifend. Sed consectetur gravida euismod. Cras vehicula ipsum mauris, sit amet porta mauris dapibus eu. Curabitur cursus, elit ut aliquet sagittis, justo erat finibus sapien, ac suscipit metus nisi a leo. Integer tristique sit amet magna eget tristique.

Nullam porttitor vestibulum dignissim. Cras placerat nisl magna, sit amet vestibulum diam auctor nec. Nunc arcu nunc, suscipit vel efficitur placerat, commodo quis nibh. Fusce imperdiet velit ligula, id finibus tellus molestie et. Aliquam efficitur velit bibendum finibus sagittis. Ut tincidunt ornare turpis, ut rhoncus sapien cursus sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum neque ante, pellentesque eget odio sit amet, iaculis iaculis felis. Nam eu scelerisque urna. Donec porttitor pellentesque venenatis.

Pellentesque et arcu et sem viverra semper. Donec et ipsum porta, pulvinar ex sit amet, commodo odio. Nulla in turpis posuere, euismod lorem eu, cursus lacus. Nunc sollicitudin urna a urna semper, non volutpat justo iaculis. Duis augue nibh, mattis quis felis sit amet, lobortis semper lorem. Mauris erat quam, ultrices nec purus in, egestas commodo ligula. Aliquam nec efficitur ante, et mattis felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam sit amet sem hendrerit, volutpat est ut, pretium dolor. Fusce lacinia eleifend mauris quis rutrum. Ut condimentum justo dolor, ut venenatis ligula sollicitudin eu. Etiam hendrerit a arcu at ornare.`;
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
  var fiber = Fiber.current
  coll.insert(buffer, (err, doc) => {
    fiber.run()
  })
  Fiber.yield()
}

function countCollection(coll) {
  var fiber = Fiber.current
  let total = 0
  coll.count((err,count) => {
    total = count
    fiber.run()
  })
  Fiber.yield()
  return total
}

function generateBooksAndFiles(number) {
  const serverPath = path.join(__dirname, '../../server/db')
  const db = new Engine.Db(serverPath, {})

  try {
    fs.unlinkSync(path.join(serverPath + '/books'))
  } catch(idontcareifitfails){}

  const Books = db.collection('books')

  console.log("Generating " + number + " books")

  //start generation process
  let buffer = [];
  [...Array(number).keys()].forEach(i => {
    const gender = genGender()
    const generated = {
      isbn: 'ISBN-' + _.padStart('' + rand(999999, 1), 9, '0'),
      title: genTitle(),
      cover: genBookCover(),
      author: {
        name: genFullname(gender),
        gender: gender,
        image: genAuthorImage(gender)
      },
      authorGender: gender,
      category: genCategory(),
      publishDate: genPublishDate(),
      rating: rand(5)+1,
      description: genDescription()
    }

    buffer.push(generated)

    if(buffer.length >= 1000) {
      writeBuffer(buffer, Books, db)
      buffer = []
    }
  })

  if(buffer.length) {
    writeBuffer(buffer, Books, db)
    buffer = []
  }
}

export default generateBooksAndFiles
