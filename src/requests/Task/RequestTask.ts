import { createSlice } from "@reduxjs/toolkit";
import TaskApi from "src/api/Task/ApiTask";
import { IAddTaskBody, IGetTaskDetailsBody } from "src/interfaces/Task/ITask";
import { AppThunk } from "src/store";


const Taskslice = createSlice({
    name: 'Task',
    initialState: {
        TaskTypeList: [],
        TaskSubjectList: [],
        AddTaskMsg: '',
        TasksList: [],
        DeleteTaskDetailsMsg: '',
        TaskDetails: null,
        Loading: true

    },
    reducers: {
        resetAddTaskDetails(state) {
            state.Loading = false;
            state.AddTaskMsg = "";
        },
        getTaskDetails(state, action) {
            state.Loading = false;
            state.TaskDetails = action.payload;
        },
        resetDeleteTaskDetails(state) {
            state.Loading = false;
            state.DeleteTaskDetailsMsg = "";
        },
        deleteTaskdetails(state, action) {
            state.Loading = false;
            state.DeleteTaskDetailsMsg = action.payload;
        },
        getTasksList(state, action) {
            state.Loading = false;
            state.TasksList = action.payload;
        },

        getAddTaskMsg(state, action) {
            state.Loading = false;
            state.AddTaskMsg = action.payload;
        },
        getTaskSubjectList(state, action) {
            state.Loading = false;
            state.TaskSubjectList = action.payload;
        },
        getTaskTypeList(state, action) {
            state.Loading = false;
            state.TaskTypeList = action.payload;
        },
        getLoading(state, action) {
            state.Loading = true;
        }

    }
});

export const resetAddTaskDetails =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(Taskslice.actions.resetAddTaskDetails());
        };                                          // to reset task Added message 


export const getTaskDetails =
    (data: IGetTaskDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(Taskslice.actions.getLoading(true));
            const response = await TaskApi.GetTaskDetailsApi(data);
            dispatch(Taskslice.actions.getTaskDetails(response.data));
        };

export const resetDeleteTaskDetails =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(Taskslice.actions.resetDeleteTaskDetails());
        };

export const deleteTaskDetails =
    (data: IGetTaskDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(Taskslice.actions.getLoading(true));
            const response = await TaskApi.DeleteTaskDetailsApi(data);
            dispatch(Taskslice.actions.deleteTaskdetails(response.data));
        };

export const getTasksList =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(Taskslice.actions.getLoading(true));
            const response = await TaskApi.GetTasksListApi();
            const responseData = response.data.map((Item, i) => {
                return {
                    Id: Item.ID,
                    Text1: Item.TaskSubjectName,
                    Text2: Item.TaskName,
                    Text3: Item.Tasktime,
                    Text4: Item.TaskTypeName,
                    // Text5: Item. IsReminder
                };
            });
            dispatch(Taskslice.actions.getTasksList(responseData));
        };


export const AddTaskDetails =
    (data: IAddTaskBody): AppThunk =>
        async (dispatch) => {
            dispatch(Taskslice.actions.getLoading(true));
            const response = await TaskApi.AddTaskApi(data);
            dispatch(Taskslice.actions.getAddTaskMsg(response.data));
        };      // To add Task 

export const getTaskSubjectList =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(Taskslice.actions.getLoading(true));
            const response = await TaskApi.GetTaskSubjectListApi();
            const responseData = response.data.map((Item, i) => {
                return {
                    Id: Item.TaskSubjectId,
                    Name: Item.TaskSubjectName,
                    Value: Item.TaskSubjectId.toString()
                };
            });
            dispatch(Taskslice.actions.getTaskSubjectList(responseData));
        };

export const getTaskTypeList =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(Taskslice.actions.getLoading(true));
            const response = await TaskApi.GetTaskTypeListApi();
            const responseData = response.data.map((Item, i) => {
                return {
                    Id: Item.TaskTypeId,
                    Name: Item.TaskTypeName,
                    Value: Item.TaskTypeId.toString()
                };
            });
            dispatch(Taskslice.actions.getTaskTypeList(responseData));
        };
export default Taskslice.reducer;