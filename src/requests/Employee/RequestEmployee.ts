import { createSlice } from "@reduxjs/toolkit";
import EmployeeApi from "src/api/Employee/ApiEmployee";
import { IAddEmployeeBody, IGetEmployeeDetailsBody } from "src/interfaces/Employee/IEmployee";
import { AppThunk } from "src/store";

const Employeeslice = createSlice({
    name: 'Employee',
    initialState: {
        DesignationList: [],
        AddEmployeeMsg: '',
        EmployeeList: [],
        deleteEmployeedetailsMsg: '',
        updateEmployeedetailsMsg: '',
        EmployeeDetails: null,
        Loading: true
    },
    reducers: {

        resetAddEmployeeDetails(state) {
            state.Loading = false;
            state.AddEmployeeMsg = "";
        },
        getEmployeeDetails(state, action) {
            state.Loading = false;
            state.EmployeeDetails = action.payload;
        },
        resetDeleteEmployeeDetails(state) {
            state.Loading = false;
            state.deleteEmployeedetailsMsg = "";
        },
        updateEmployeedetails(state, action) {
            state.Loading = false;
            state.updateEmployeedetailsMsg = action.payload;
        },
        deleteEmployeedetails(state, action) {
            state.Loading = false;
            state.deleteEmployeedetailsMsg = action.payload;
        },
        getEmployeeList(state, action) {
            state.Loading = false;
            state.EmployeeList = action.payload;
        },
        getAddEmployeeMsg(state, action) {
            state.Loading = false;
            state.AddEmployeeMsg = action.payload;
        },
        getDesignationList(state, action) {
            state.Loading = false;
            state.DesignationList = action.payload;
        },
        getLoading(state, action) {
            state.Loading = true;
        }
    }
});

export const getDesignationList =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(Employeeslice.actions.getLoading(true));
            const response = await EmployeeApi.GetDesignationListApi();
            const responseData = response.data.map((Item, i) => {
                return {
                    Id: Item.DesignationId,
                    Name: Item.DesignationName,
                    Value: Item.DesignationId.toString()
                };
            });
            dispatch(Employeeslice.actions.getDesignationList(responseData));
        };

export const AddEmployeeDetails =
    (data: IAddEmployeeBody): AppThunk =>
        async (dispatch) => {
            dispatch(Employeeslice.actions.getLoading(true));
            const response = await EmployeeApi.AddEmployeeApi(data);
            dispatch(Employeeslice.actions.getAddEmployeeMsg(response.data));
        };

export const getEmployeeList =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(Employeeslice.actions.getLoading(true));
            const response = await EmployeeApi.GetEmployeeListApi();
            const responseData = response.data.map((Item, i) => {
                return {
                    Id: Item.ID,
                    Text1: Item.EmployeeName,
                    Text2: Item.BirthDate,
                    Text3: Item.EmailId,
                    Text4: Item.PhoneNo
                };
            });
            dispatch(Employeeslice.actions.getEmployeeList(responseData));
        };

export const deleteEmployeeDetails =
    (data: IGetEmployeeDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(Employeeslice.actions.getLoading(true));
            const response = await EmployeeApi.DeleteEmployeedetailsApi(data);
            dispatch(Employeeslice.actions.deleteEmployeedetails(response.data));
        };

export const resetDeleteEmployeeDetails =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(Employeeslice.actions.resetDeleteEmployeeDetails());
        };

export const updateEmployeeDetails =
    (data: IAddEmployeeBody): AppThunk =>
        async (dispatch) => {
            dispatch(Employeeslice.actions.getLoading(true));
            const response = await EmployeeApi.UpdateEmployeedetailsApi(data);
            dispatch(Employeeslice.actions.updateEmployeedetails(response.data));
        };

export const getEmployeeDetails =
    (data: IGetEmployeeDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(Employeeslice.actions.getLoading(true));
            const response = await EmployeeApi.GetEmployeeDetailsApi(data);

            dispatch(Employeeslice.actions.getEmployeeDetails(response.data));
        };

export const resetAddEmployeeDetails =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(Employeeslice.actions.resetAddEmployeeDetails());
        };



export default Employeeslice.reducer;