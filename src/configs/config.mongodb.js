'use strict'

// level 0

// const config = {
//   app: {
//     port: 3000
//   },
//   db: {
//     host: 'localhost',
//     port: 27017,
//     name: 'db'
//   }
// }

// level 1
const local = {
  app: {
    port: process.env.LOCAL_APP_PORT || 3000
  },
  db: {
    type: 'mongodb',
    host: process.env.LOCAL_DB_HOST || 'localhost',
    port: process.env.LOCAL_DB_PORT || 27017,
    name: process.env.LOCAL_DB_NAME || ''
  }
}

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 3000
  },
  db: {
    type: 'mongodb',
    host: process.env.PRO_DB_HOST || 'localhost',
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || ''
  }
}

const mongoAtlas = {
  app: {
    port: process.env.ATLAS_APP_PORT || 3000
  },
  db: {
    type: 'mongoAtlas',
    host: process.env.MONGO_ATLAS_HOST || 'localhost'
  }
}

const config = { local, pro, mongoAtlas }
const env = process.env.NODE_ENV || 'local'

module.exports = config[env]
