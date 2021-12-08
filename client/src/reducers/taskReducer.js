import { GET_TASKS_FOR_CURRENT_PROFILE,GET_TASKS_TO_EDIT } from '../actions/types'

function taskReducer(state = {}, action) {
    let { type, payload } = action;
    switch (type) {
        case GET_TASKS_FOR_CURRENT_PROFILE:
            return {
                ...state,
                tasks: payload,
                loading: false
            }

        case GET_TASKS_TO_EDIT:
            return {
                ...state,
                taskToEdit: payload,
                loading: false
            }

        default:
            return state;
    }
}
export default taskReducer;