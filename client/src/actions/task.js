import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_TASKS_FOR_CURRENT_PROFILE,
  PROFILE_ERROR,
  GET_TASKS_TO_EDIT
} from './types';

export const getTaskForCUrrentProfile = (formData, navigate) => async (dispatch) => {
    try {
      const res = await api.post('/tasks',formData);
  
      dispatch({
        type: GET_TASKS_FOR_CURRENT_PROFILE,
        payload: res.data
      });
      navigate('/dashboard')
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  
  // add action to get the profile existing task .// add reducer also to create task
  // call this method from dashboad to get the task and update in UI
  export const getAllTasks=()=> async (dispatch) =>{
      try {
        const res = await api.get('/tasks/getTasks');
  
        dispatch({
          type: GET_TASKS_FOR_CURRENT_PROFILE,
          payload: res.data
        });
      } catch (err) {
        // dispatch({
        //     type: PROFILE_ERROR,
        //     payload: { msg: err.response, status: err.response.status }
        //   });
      }
  }

  export const deleteTask = (id) => async (dispatch) => {
    try {
      const res = await api.delete(`/tasks/taskid/${id}`);
  
      dispatch({
        type: GET_TASKS_FOR_CURRENT_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('task Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // get task and display that task in ui editTask

  export const getTask = (id,navigate) => async (dispatch) => {
    try {
        navigate('/add-task');
      const res = await api.get(`/tasks/getTaskById/${id}`);
  
      dispatch({
        type: GET_TASKS_TO_EDIT,
        payload: res.data
      });
      
      dispatch(setAlert('task Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };