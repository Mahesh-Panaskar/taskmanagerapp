
const express = require('express');
const route = express.Router();
const Task = require('../../models/taskModel');
const auth = require('../../middleware/auth');

// @route    POST /api/tasks
// @desc     Add task / edit task
// @access   Private
//create or update task API
route.post('/', auth, async (req, resp, next) => {
  try {

    let task = await Task.findOne({ user: req.user.id });
    const { title, deadline, taskStatus, taskDesc, priority, idToEdit } = req.body
    if (task) {
      if (idToEdit) {
        let existingElement = task.tasks.findIndex(x => x.id === idToEdit);
        if (existingElement > 0) {
          task.tasks[existingElement] = { title, deadline, taskStatus, taskDesc, priority };
        }
        await task.save()
        resp.json(task);
      }
      else {
        task.tasks.unshift({ title, deadline, taskStatus, taskDesc, priority });
        await task.save()
        resp.json(task);
      }

    }
    else {
      task = new Task({
        user: req.user.id,
        tasks: [{
          title,
          deadline,
          taskStatus,
          taskDesc,
          priority
        }
        ]
      });
    }
    await task.save()
    resp.json(task);
  } catch (err) {
    console.error(err.message);
    resp.status(500).send('Server Error at task creation');
  }

})

// @route    get api/getTasks
// @desc     returns all the tasks
// @access   Private
//create or update task API
route.get('/getTasks', auth, async (req, resp, next) => {
  try {

    let task = await Task.findOne({ user: req.user.id });
    if (task) {
      resp.json(task);
    }
    else {
      console.error("tasks not found");
      resp.json(null)
    }
  } catch (err) {
    console.error(err.message);
    resp.status(500).send('Server Error at task creation');
  }

})

// @route    DELETE api/tasks/taskid/:task_id
// @desc     Delete task from task list
// @access   Private

route.delete('/taskid/:task_id', auth, async (req, res) => {
  try {
    const foundProfile = await Task.findOne({ user: req.user.id });

    foundProfile.tasks = foundProfile.tasks.filter(
      (task) => task._id.toString() !== req.params.task_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    get api/tasks/taskid/:getTaskById
// @desc     Delete task from task list
// @access   Private

route.get('/getTaskById/:task_id', auth, async (req, res) => {
  try {
    const foundProfile = await Task.findOne({ user: req.user.id });

    let requestedTask = foundProfile.tasks.filter(
      (task) => task._id.toString() === req.params.task_id
    );

    return res.status(200).json(requestedTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = route;