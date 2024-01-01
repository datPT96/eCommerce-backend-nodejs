'use strict'

const { Schema, model } = require('mongoose')
const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'

var keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Shop'
    },
    privateKey: {
      type: String,
      required: true
    },
    publicKey: {
      type: String,
      require: true
    },
    refreshTokenUsed: {
      type: Array,
      default: [] //refreshToken da duoc su dung
    },
    refreshToken: {
      type: String,
      required: true
    }
  },
  {
    collation: COLLECTION_NAME,
    timestamps: true
  }
)

module.exports = model(DOCUMENT_NAME, keyTokenSchema)
