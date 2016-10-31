require('babel-register')
var Fiber = require('fibers')
var generate = require('./commands/generate').default
var count = require('./commands/count').default

const command = getArg(0) || 'generate'
const total = parseInt(getArg(1), 10) || 1000000

function getArg(num) {
  if (process.argv.length <= (num + 2)) return null

  return process.argv[num + 2]
}

Fiber(() => {
  switch(command) {
    case 'generate':
      generate(total)
      break;
    case 'count':
      console.log(count())
      break;
  }
}).run()


