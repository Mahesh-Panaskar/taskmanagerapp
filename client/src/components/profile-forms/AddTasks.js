import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { getTaskForCUrrentProfile } from '../../actions/task'
import taskReducer from '../../reducers/taskReducer';

const initialState = {
  title: '',
  deadline: '',
  taskStatus: false,
  taskDesc: '',
  priority: '',
  idToEdit: ''
}

const AddTasks = ({ addExperience, getTaskForCUrrentProfile, task: { taskToEdit, loading } }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);

  const { title, deadline, taskStatus, taskDesc, priority } = formData;

  useEffect(() => {

    if (!loading && taskToEdit) {
      const profileData = { ...initialState };
      profileData.idToEdit = taskToEdit[0]._id;
      for (const key in taskToEdit[0]) {
        if (key in profileData) profileData[key] = taskToEdit[0][key];

      }
      setFormData(profileData);
    }
  }, [loading, taskToEdit]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="container">
      <h1 className="large text-primary">Add a Task</h1>

      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          getTaskForCUrrentProfile(formData, navigate);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Task Name"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="taskDesc"
            cols="30"
            rows="5"
            placeholder="Task Description"
            value={taskDesc}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Task prioroty(low medium high)"
            name="priority"
            value={priority}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <h4>Deadline Date</h4>
          <input type="date" name="deadline" value={deadline} onChange={onChange} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="taskStatus"
              checked={taskStatus}
              value={taskStatus}
              onChange={() => {
                setFormData({ ...formData, taskStatus: !taskStatus });
              }}
            />{' '}
            is Taks completed
          </p>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddTasks.propTypes = {
  addExperience: PropTypes.func.isRequired,
  getTaskForCUrrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  task: state.taskReducer
})

export default connect(mapStateToProps, { addExperience, getTaskForCUrrentProfile })(AddTasks);
