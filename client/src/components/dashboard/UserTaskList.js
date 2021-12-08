import { deleteTask, getTask } from '../../actions/task';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { Link, useMatch, useNavigate } from 'react-router-dom';


const UserTaskList = ({ task, deleteTask, getTask }) => {
    const navigate = useNavigate();
    let highPriorityTask = [], mediumPriorityTask = [], lowPriorityTask = [];
    let getTaleData = (taskValue) => {
        return (<tr key={taskValue._id}>
            <td>{taskValue.title}</td>
            <td>{taskValue.taskDesc}</td>
            <td>
                {formatDate(taskValue.deadline)}
            </td>
            <td>{taskValue.priority}</td>

            <td>{taskValue.taskStatus === true ? 'complete' : 'incomplete'}</td>
            <td>
                <button
                    onClick={() => deleteTask(taskValue._id)}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            </td>
            <td>
                <button
                    onClick={() => getTask(taskValue._id, navigate)}
                    className="btn btn-success"
                >
                    Edit
                </button>
            </td>
        </tr>)
    }
    const TasksList = task.tasks.map((taskValue) => {
        if (taskValue.priority == 'high') {
            highPriorityTask.push(getTaleData(taskValue))
        }
        if (taskValue.priority == 'low') {
            lowPriorityTask.push(getTaleData(taskValue))
        }
        if (taskValue.priority == 'medium') {
            mediumPriorityTask.push(getTaleData(taskValue))
        }
    }
    );
    return (
        <>
            
            <>
                <h2 className="my-2">Task details</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th >TaskDesc</th>
                            <th >Deadline</th>
                            <th >Priority</th>
                            <th >tTask Status</th>
                            <th />
                            <th />
                        </tr>
                    </thead>

                    <tbody>{highPriorityTask}</tbody>
                    <tbody>{mediumPriorityTask}</tbody>
                    <tbody>{lowPriorityTask}</tbody>

                </table>
            </>
        </>
    )
}


export default connect(null, { deleteTask, getTask })(UserTaskList);