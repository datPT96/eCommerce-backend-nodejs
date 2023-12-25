'use strict'

const { Schema, model } = require('mongoose')
const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'

var keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'Shop'
    },
    privateKey: {
      type: String,
      require: true
    },
    publicKey: {
      type: String,
      require: true
    },
    refreshToken: {
      type: Array,
      default: []
    }
  },
  {
    collation: COLLECTION_NAME,
    timestamps: true
  }
)

module.exports = model(DOCUMENT_NAME, keyTokenSchema)
