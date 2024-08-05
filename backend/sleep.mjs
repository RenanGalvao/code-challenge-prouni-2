// node sleep.js 1 will generate from argv = [<node bin>, <this file>, '1']
const seconds = process.argv[2] && !Number.isNaN(Number(process.argv[2])) ? Number(process.argv[2]) : 1
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
console.log(`\nWaiting for ${seconds} second(s)...\n`)
await delay(seconds * 1000)