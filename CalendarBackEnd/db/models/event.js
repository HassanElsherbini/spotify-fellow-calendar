const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const eventSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  description: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
},
{
  timestamps: true
});

let Event = module.exports = mongoose.model('Event', eventSchema);
