const mongoos = require('mongoose');
const taskSchema = new mongoos.Schema({
  user: {
    type: mongoos.Schema.Types.ObjectId,
    ref: 'user'
  },
  tasks: [{
    title: {
      type: String,
      required: true
    },
    taskDesc: {
      type: String
    },
    priority: {
      type: String
    },
    taskStatus: {
      type: Boolean,
      default: false
    },
    deadline: {
      type: Date
    },
  }]
})

module.exports = mongoos.model('task', taskSchema);