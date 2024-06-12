const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TopicSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  data: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Sandia'
    }
  ]
})

module.exports = mongoose.model('Topic', TopicSchema)
