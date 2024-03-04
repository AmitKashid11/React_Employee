import { IAddEmployeeBody, IGetEmployeeDetailsBody } from "src/interfaces/Employee/IEmployee";
import http from '../../requests/SchoolService/schoolServices';


const GetDesignationListApi = () => {
    return http.post<IAddEmployeeBody[]>('GetDesignationList');
};

const AddEmployeeApi = (data: IAddEmployeeBody) => {
    return http.post<string>('AddEmployee', data);
};

const GetEmployeeListApi = () => {
    return http.post<IAddEmployeeBody[]>('GetEmployeeList');
};

const DeleteEmployeedetailsApi = (data: IGetEmployeeDetailsBody) => {
    return http.post<string>('DeleteEmployee', data);
};

const UpdateEmployeedetailsApi = (data: IAddEmployeeBody) => {
    return http.post<string>('UpdateEmployeedetails', data);
};

const GetEmployeeDetailsApi = (data: IGetEmployeeDetailsBody) => {
    return http.post<IAddEmployeeBody>('GetEmployeeDetails', data);
};




const EmployeeApi = {
    GetDesignationListApi,
    AddEmployeeApi,
    GetEmployeeListApi,
    DeleteEmployeedetailsApi,
    UpdateEmployeedetailsApi,
    GetEmployeeDetailsApi,
};
export default EmployeeApi;
