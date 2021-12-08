import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTasks } from '../../actions/task';
import UserTaskList from './UserTaskList';

const Dashboard = ({
  getAllTasks,
  auth: { user },
  taskReducer
}) => {
  useEffect(() => {
    getAllTasks()
  }, [getAllTasks]);

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {taskReducer.tasks !== null && taskReducer.tasks !== undefined ? (
        <>
          <Link to="/add-task" className="btn btn-primary my-1">
            Create task
          </Link>
          <UserTaskList task={taskReducer.tasks}></UserTaskList>
        </>
      ) :
        (
          <>
            <p>You do not have any task, please add some Tasks</p>
            <Link to="/add-task" className="btn btn-primary my-1">
              Create task
            </Link>
          </>
        )}

    </section>
  );
};

Dashboard.propTypes = {
  getAllTasks: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  taskReducer: state.taskReducer
});

export default connect(mapStateToProps, { getAllTasks })(
  Dashboard
);
