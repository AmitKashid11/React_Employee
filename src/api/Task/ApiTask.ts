import { IAddTaskBody, IGetTaskDetailsBody } from "src/interfaces/Task/ITask";
import http from '../../requests/SchoolService/schoolServices';

const GetTaskTypeListApi = () => {
    return http.post<IAddTaskBody[]>('GetTaskType');
};
const GetTaskSubjectListApi = () => {
    return http.post<IAddTaskBody[]>('GetTaskSubjects');
};
const AddTaskApi = (data: IAddTaskBody) => {
    return http.post<string>('AddTasks', data);
};

const GetTasksListApi = () => {
    return http.post<IAddTaskBody[]>('GetTasksList')
};

const DeleteTaskDetailsApi = (data: IGetTaskDetailsBody) => {
    return http.post<string>("DeleteTasks", data)
};

const GetTaskDetailsApi = (data: IGetTaskDetailsBody) => {
    return http.post<IAddTaskBody>('GetTaskDetails', data);
};


const TaskApi = {
    GetTaskTypeListApi,
    GetTaskSubjectListApi,
    AddTaskApi,
    GetTasksListApi,
    DeleteTaskDetailsApi,
    GetTaskDetailsApi
}
export default TaskApi