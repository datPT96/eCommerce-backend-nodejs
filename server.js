const app = require('./src/app')
const {
  app: { port }
} = require('./src/configs/config.mongodb')

const PORT = port || 3003

// eslint-disable-next-line no-unused-vars
const server = app.listen(PORT, () => {
  console.log('🚀 Start at port: ', PORT, '. Node version: ', process.version)
})

// process.on('SIGINT', () => {
//   server.close(() => {
//     console.log(`Exit Server Express`)
//   })
// })
